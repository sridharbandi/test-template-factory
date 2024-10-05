import React, { useState, useEffect } from 'react';
import { ProjectConfig } from '../types';
import { FolderIcon, DocumentIcon, ChevronRightIcon, ChevronDownIcon, FolderOpenIcon } from '@heroicons/react/24/outline';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { ClipboardIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import ReactMarkdown from 'react-markdown';
import { useTheme } from './ThemeProvider';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

interface PreviewProps {
    config: ProjectConfig;
    onClose: () => void;
    onDownload: () => void;
}

interface TreeItem {
    path: string;
    type: string;
    url: string;
    children?: TreeItem[];
}

const Preview: React.FC<PreviewProps> = ({ config, onClose, onDownload }) => {
    const [treeData, setTreeData] = useState<TreeItem[]>([]);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
    const [error, setError] = useState<string | null>(null);
    const { theme } = useTheme();

    useEffect(() => {
        fetchRepoTree(config);
    }, [config]);

    const fetchRepoTree = async (config: ProjectConfig) => {
        try {
            const response = await fetch(
                `https://api.github.com/repos/sridharbandi/Selenium-Serenity-Junit-Template/git/trees/master?recursive=true`,
                {
                    headers: {
                        'Accept': 'application/vnd.github+json',
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const processedData = processTreeData(data.tree);
            setTreeData(processedData);
            setError(null);
        } catch (error) {
            console.error('Error fetching repo tree:', error);
            setError('Failed to fetch repository tree. Please try again.');
        }
    };

    const processTreeData = (items: any[]): TreeItem[] => {
        const root: TreeItem[] = [];

        items.forEach(item => {
            const parts = item.path.split('/');
            let current = root;

            parts.forEach((part, index) => {
                let existingItem = current.find(i => i.path === part);
                if (!existingItem) {
                    existingItem = {
                        path: part,
                        type: index === parts.length - 1 ? item.type : 'tree',
                        url: item.url,
                        children: []
                    };
                    current.push(existingItem);
                }
                if (index < parts.length - 1) {
                    current = existingItem.children as TreeItem[];
                }
            });
        });

        return root;
    };

    const fetchFileContent = async (url: string) => {
        try {
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/vnd.github.v3.raw',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const content = await response.text();
            setFileContent(content);
            setError(null);
        } catch (error) {
            console.error('Error fetching file content:', error);
            setError('Failed to fetch file content. Please try again.');
        }
    };

    const toggleFolder = (path: string) => {
        setExpandedFolders(prev => {
            const next = new Set(prev);
            if (next.has(path)) {
                next.delete(path);
            } else {
                next.add(path);
            }
            return next;
        });
    };

    const renderTree = (items: TreeItem[], path: string = '') => {
        return items.map((item) => {
            const currentPath = path ? `${path}/${item.path}` : item.path;
            if (item.type === 'tree') {
                const isExpanded = expandedFolders.has(currentPath);
                return (
                    <li key={currentPath}>
                        <div
                            className={`flex items-center cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-1`}
                            onClick={() => toggleFolder(currentPath)}
                        >
                            {isExpanded ? (
                                <ChevronDownIcon className="h-4 w-4 mr-1" />
                            ) : (
                                <ChevronRightIcon className="h-4 w-4 mr-1" />
                            )}
                            {isExpanded ? (
                                <FolderOpenIcon className="h-5 w-5 mr-2 text-yellow-500" />
                            ) : (
                                <FolderIcon className="h-5 w-5 mr-2 text-yellow-500" />
                            )}
                            {item.path}
                        </div>
                        {isExpanded && item.children && (
                            <ul className="ml-4">
                                {renderTree(item.children, currentPath)}
                            </ul>
                        )}
                    </li>
                );
            } else {
                return (
                    <li
                        key={currentPath}
                        className={`flex items-center cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-1 ${selectedFile === currentPath ? 'text-violet-400 font-bold' : ''}`}
                        onClick={() => {
                            setSelectedFile(currentPath);
                            fetchFileContent(item.url);
                        }}
                    >
                        <DocumentIcon className="h-5 w-5 mr-2 text-violet-500" />
                        {item.path}
                    </li>
                );
            }
        });
    };

    const getLanguage = (fileName: string): string => {
        const extension = fileName.split('.').pop()?.toLowerCase();
        switch (extension) {
            case 'js':
                return 'javascript';
            case 'ts':
                return 'typescript';
            case 'jsx':
                return 'jsx';
            case 'tsx':
                return 'tsx';
            case 'html':
                return 'html';
            case 'css':
                return 'css';
            case 'json':
                return 'json';
            case 'xml':
                return 'xml';
            case 'md':
                return 'markdown';
            case 'py':
                return 'python';
            case 'java':
                return 'java';
            default:
                return 'text';
        }
    };

    const handleCopyToClipboard = () => {
        if (fileContent) {
            navigator.clipboard.writeText(fileContent).then(() => {
                console.log('Copied to clipboard');
            }, (err) => {
                console.error('Could not copy text: ', err);
            });
        }
    };

    const handleDownloadFile = () => {
        if (fileContent && selectedFile) {
            const blob = new Blob([fileContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = selectedFile.split('/').pop() || 'download';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    return (
        <div className={`h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
            <div className="flex-grow overflow-hidden">
                <div className="flex h-full">
                    <div className={`w-1/3 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} p-6 overflow-auto border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                        <div className={`flex justify-between items-center mb-4 pb-2 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                            <h2 className="py-2 text-lg font-medium">Structure</h2>
                        </div>
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <div className="overflow-auto max-h-[calc(100vh-12rem)]">
                            <ul className="space-y-2">
                                {renderTree(treeData)}
                            </ul>
                        </div>
                    </div>
                    <div className={`w-2/3 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} p-6 overflow-auto`}>
                        <div className={`flex justify-between items-center mb-4 pb-2 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                            <h3 className="py-2 text-lg font-medium">Preview</h3>
                            {selectedFile && (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handleCopyToClipboard}
                                        className={`p-2 rounded-full ${theme === 'dark' ? 'text-violet-500 hover:bg-violet-500 hover:text-white' : 'text-violet-600 hover:bg-violet-600 hover:text-white'}`}
                                        title="Copy to Clipboard"
                                    >
                                        <ClipboardIcon className="h-7 w-7" />
                                    </button>
                                    <button
                                        onClick={handleDownloadFile}
                                        className={`p-2 rounded-full ${theme === 'dark' ? 'text-violet-500 hover:bg-violet-500 hover:text-white' : 'text-violet-600 hover:bg-violet-600 hover:text-white'}`}
                                        title="Download File"
                                    >
                                        <ArrowDownTrayIcon className="h-7 w-7" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="overflow-auto max-h-[calc(100vh-12rem)]">
                            {selectedFile ? (
                                selectedFile.toLowerCase().endsWith('.md') ? (
                                    <div className={`prose ${theme === 'dark' ? 'prose-invert' : ''} max-w-none`}>
                                        <ReactMarkdown>{fileContent || ''}</ReactMarkdown>
                                    </div>
                                ) : (
                                    <SyntaxHighlighter
                                        language={getLanguage(selectedFile)}
                                        style={theme === 'dark' ? vscDarkPlus : undefined}
                                        showLineNumbers={true}
                                        wrapLines={true}
                                        codeTagProps={{
                                            style: {
                                                fontSize: "inherit",
                                                lineHeight: "inherit"
                                            }
                                        }}
                                        customStyle={{
                                            margin: 0,
                                            lineHeight: "1.5",
                                            fontSize: "0.9em",
                                            padding: '1rem',
                                            borderRadius: '0.25rem',
                                            backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f8f8f8',
                                        }}
                                        Close
                                    >
                                        {fileContent || ''}
                                    </SyntaxHighlighter>
                                )
                            ) : (
                                <p>Select a file to preview</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <footer className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} p-4 flex justify-center space-x-4`}>
                <button
                    onClick={onClose}
                    className={`border ${theme === 'dark' ? 'border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white' : 'border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white'} font-bold py-2 px-4 rounded`}
                >
                    Close
                </button>
                <button
                    onClick={onDownload}
                    className={`border ${theme === 'dark' ? 'border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white' : 'border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white'} font-bold py-2 px-4 rounded`}
                >
                    Download
                </button>
            </footer>
        </div>
    );
};

export default Preview;