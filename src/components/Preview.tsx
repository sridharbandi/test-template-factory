import React, { useState } from 'react';
import { PreviewProps } from '../types';
import { useTheme } from './ThemeProvider';
import TreeView from './TreeView';
import FilePreview from './FilePreview';
import { useFileContent } from '../hooks/useFileContent';
import { useTreeData } from '../hooks/useTreeData';
import { useExpandedFolders } from '../hooks/useExpandedFolders';
import Button from './Button';
import { downloadFile, copyToClipboard } from '../utils/fileUtils';

const Preview: React.FC<PreviewProps> = ({ config, onClose, onDownload }) => {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const { theme } = useTheme();
    const { fileContent, error: fileError, fetchFileContent } = useFileContent();
    const { treeData, error: treeError } = useTreeData(config);
    const { expandedFolders, toggleFolder } = useExpandedFolders();

    const handleSelectFile = (path: string, url: string) => {
        setSelectedFile(path);
        fetchFileContent(url);
    };

    const handleCopyToClipboard = () => {
        if (fileContent) {
            copyToClipboard(fileContent);
        }
    };

    const handleDownloadFile = () => {
        if (fileContent && selectedFile) {
            const fileName = selectedFile.split('/').pop() || 'download';
            downloadFile(fileContent, fileName);
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
                        {treeError && <div className="text-red-500 mb-4">{treeError}</div>}
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
                <Button onClick={onClose}>Close</Button>
                <Button onClick={onDownload}>Download</Button>
            </footer>
        </div>
    );
};

export default Preview;