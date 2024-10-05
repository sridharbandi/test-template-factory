import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ReactMarkdown from 'react-markdown';
import { useTheme } from './ThemeProvider';
import { ClipboardIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';

interface FilePreviewProps {
    selectedFile: string | null;
    fileContent: string | null;
    onCopyToClipboard: () => void;
    onDownloadFile: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ selectedFile, fileContent, onCopyToClipboard, onDownloadFile }) => {
    const { theme } = useTheme();

    const getLanguage = (fileName: string): string => {
        const extension = fileName.split('.').pop()?.toLowerCase();
        switch (extension) {
            case 'js': return 'javascript';
            case 'ts': return 'typescript';
            case 'jsx': return 'jsx';
            case 'tsx': return 'tsx';
            case 'html': return 'html';
            case 'css': return 'css';
            case 'json': return 'json';
            case 'xml': return 'xml';
            case 'md': return 'markdown';
            case 'py': return 'python';
            case 'java': return 'java';
            default: return 'text';
        }
    };

    return (
        <>
            <div className={`flex justify-between items-center mb-4 pb-2 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                <h3 className="py-2 text-lg font-medium">Preview</h3>
                {selectedFile && (
                    <div className="flex space-x-2">
                        <button
                            onClick={onCopyToClipboard}
                            className={`p-2 rounded-full ${theme === 'dark' ? 'text-violet-500 hover:bg-violet-500 hover:text-white' : 'text-violet-600 hover:bg-violet-600 hover:text-white'}`}
                            title="Copy to Clipboard"
                        >
                            <ClipboardIcon className="h-7 w-7" />
                        </button>
                        <button
                            onClick={onDownloadFile}
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
                        >
                            {fileContent || ''}
                        </SyntaxHighlighter>
                    )
                ) : (
                    <p>Select a file to preview</p>
                )}
            </div>
        </>
    );
};

export default FilePreview;
