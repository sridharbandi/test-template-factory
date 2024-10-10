import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ReactMarkdown from 'react-markdown';
import { ClipboardIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { usePreviewContent } from '../hooks/usePreviewContent';
import IconButton from './IconButton';
import { useThemedStyles } from '../hooks/useThemedStyles';
import Skeleton from './Skeleton';
import rehypeRaw from 'rehype-raw';

interface FilePreviewProps {
    selectedFile: string | null;
    fileContent: string | null;
    onCopyToClipboard: () => void;
    onDownloadFile: () => void;
    isLoading: boolean;
    isMobile: boolean;
}

const FilePreview: React.FC<FilePreviewProps> = ({ selectedFile, fileContent, onCopyToClipboard, onDownloadFile, isLoading, isMobile }) => {
    const { getThemedClass } = useThemedStyles();
    const { language, isMarkdown } = usePreviewContent(selectedFile, fileContent);

    return (
        <div className="flex flex-col h-full">
            {!isMobile && (
                <div className={`flex justify-between items-center mb-4 pb-2 border-b ${getThemedClass('border-gray-700', 'border-gray-300')}`}>
                    <h3 className="py-2 text-lg font-medium">Preview</h3>
                    {selectedFile && !isLoading && (
                        <div className="flex space-x-2">
                            <IconButton
                                onClick={onCopyToClipboard}
                                title="Copy to Clipboard"
                                icon={<ClipboardIcon className="h-7 w-7" />}
                            />
                            <IconButton
                                onClick={onDownloadFile}
                                title="Download File"
                                icon={<ArrowDownTrayIcon className="h-7 w-7" />}
                            />
                        </div>
                    )}
                </div>
            )}
            <div className={`overflow-auto ${isMobile ? 'h-[calc(100vh-180px)]' : 'max-h-[calc(100vh-12rem)]'}`}>
                {isLoading ? (
                    <div className="space-y-2">
                        {[...Array(15)].map((_, index) => (
                            <Skeleton key={index} height="16px" className="mb-2" />
                        ))}
                    </div>
                ) : selectedFile ? (
                    isMarkdown ? (
                        <div className={`markdown-body ${getThemedClass('dark', 'light')}`}>
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{fileContent || ''}</ReactMarkdown>
                        </div>
                    ) : (
                        <SyntaxHighlighter
                            language={language}
                            style={getThemedClass(vscDarkPlus, undefined)}
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
                                backgroundColor: getThemedClass('#1e1e1e', '#f8f8f8'),
                            }}
                        >
                            {fileContent || ''}
                        </SyntaxHighlighter>
                    )
                ) : (
                    <p>Select a file to preview</p>
                )}
            </div>
        </div>
    );
};

export default FilePreview;