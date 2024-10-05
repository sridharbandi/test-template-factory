import React, { useState, useEffect } from 'react';
import { PreviewProps, ProjectConfig, TreeItem } from '../types';
import { useTheme } from './ThemeProvider';
import TreeView from './TreeView';
import FilePreview from './FilePreview';
import { useFileContent } from '../hooks/useFileContent';

const Preview: React.FC<PreviewProps> = ({ config, onClose, onDownload }) => {
    const [treeData, setTreeData] = useState<TreeItem[]>([]);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
    const [error, setError] = useState<string | null>(null);
    const { theme } = useTheme();
    const { fileContent, error: fileError, fetchFileContent } = useFileContent();

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

    const handleSelectFile = (path: string, url: string) => {
        setSelectedFile(path);
        fetchFileContent(url);
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
                            <TreeView
                                items={treeData}
                                expandedFolders={expandedFolders}
                                selectedFile={selectedFile}
                                onToggleFolder={toggleFolder}
                                onSelectFile={handleSelectFile}
                            />
                        </div>
                    </div>
                    <div className={`w-2/3 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} p-6 overflow-auto`}>
                        <FilePreview
                            selectedFile={selectedFile}
                            fileContent={fileContent}
                            onCopyToClipboard={handleCopyToClipboard}
                            onDownloadFile={handleDownloadFile}
                        />
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