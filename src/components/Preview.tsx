import React, { useState } from 'react';
import { PreviewProps } from '../types';
import TreeView from './TreeView';
import FilePreview from './FilePreview';
import { useFileContent } from '../hooks/useFileContent';
import { useTreeData } from '../hooks/useTreeData';
import { useExpandedFolders } from '../hooks/useExpandedFolders';
import Button from './Button';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { useFileOperations } from '../hooks/useFileOperations';
import Skeleton from './Skeleton';

interface PreviewSidebarProps {
    treeData: any;
    treeError: any;
    expandedFolders: any;
    selectedFile: any;
    onToggleFolder: any;
    onSelectFile: any;
    isLoading: boolean;
}

const Preview: React.FC<PreviewProps> = ({ config, onClose, onDownload }) => {
    const { fileContent, error: fileError, isLoading: isFileLoading, fetchFileContent } = useFileContent();
    const { treeData, error: treeError, isLoading: isTreeLoading } = useTreeData(config);
    const { expandedFolders, toggleFolder } = useExpandedFolders();
    const { selectedFile, handleSelectFile, handleCopyToClipboard, handleDownloadFile } = useFileOperations();
    const { getThemedClass } = useThemedStyles();
    const [error, setError] = useState<string | null>(null);

    return (
        <div className={`h-screen flex flex-col ${getThemedClass('bg-gray-800 text-gray-100', 'bg-white text-gray-900')}`}>
            <div className="flex-grow overflow-hidden">
                <div className="flex h-full">
                    <PreviewSidebar
                        treeData={treeData}
                        treeError={treeError}
                        expandedFolders={expandedFolders}
                        selectedFile={selectedFile}
                        onToggleFolder={toggleFolder}
                        onSelectFile={(path: string, url: string) => handleSelectFile(path, url, fetchFileContent)}
                        isLoading={isTreeLoading}
                    />
                    <PreviewContent
                        selectedFile={selectedFile}
                        fileContent={fileContent}
                        onCopyToClipboard={() => handleCopyToClipboard(fileContent)}
                        onDownloadFile={() => handleDownloadFile(fileContent, selectedFile)}
                        isLoading={isFileLoading}
                    />
                </div>
            </div>
            <PreviewFooter onClose={onClose} onDownload={onDownload} />
        </div>
    );
};

const PreviewSidebar: React.FC<PreviewSidebarProps> = ({
    treeData,
    treeError,
    expandedFolders,
    selectedFile,
    onToggleFolder,
    onSelectFile,
    isLoading,
}) => {
    const { getThemedClass } = useThemedStyles();

    return (
        <div className={`w-1/3 ${getThemedClass('bg-gray-900', 'bg-white')} p-6 overflow-auto border-r ${getThemedClass('border-gray-700', 'border-gray-300')}`}>
            <div className={`flex justify-between items-center mb-4 pb-2 border-b ${getThemedClass('border-gray-700', 'border-gray-300')}`}>
                <h2 className="py-2 text-lg font-medium">Structure</h2>
            </div>
            {treeError && <div className="text-red-500 mb-4">{treeError}</div>}
            <div className="overflow-auto max-h-[calc(100vh-12rem)]">
                {isLoading ? (
                    <div className="space-y-2">
                        {[...Array(15)].map((_, index) => (
                            <Skeleton key={index} height="20px" className="mb-2" />
                        ))}
                    </div>
                ) : (
                    <TreeView
                        items={treeData}
                        expandedFolders={expandedFolders}
                        selectedFile={selectedFile}
                        onToggleFolder={onToggleFolder}
                        onSelectFile={onSelectFile}
                    />
                )}
            </div>
        </div>
    );
};

interface PreviewContentProps {
    selectedFile: string | null;
    fileContent: string | null;
    onCopyToClipboard: () => void;
    onDownloadFile: () => void;
    isLoading: boolean;
}

const PreviewContent: React.FC<PreviewContentProps> = ({
    selectedFile,
    fileContent,
    onCopyToClipboard,
    onDownloadFile,
    isLoading,
}) => {
    const { getThemedClass } = useThemedStyles();

    return (
        <div className={`w-2/3 ${getThemedClass('bg-gray-900', 'bg-white')} p-6 overflow-auto`}>
            <FilePreview
                selectedFile={selectedFile}
                fileContent={fileContent}
                onCopyToClipboard={onCopyToClipboard}
                onDownloadFile={onDownloadFile}
                isLoading={isLoading}
            />
        </div>
    );
};

interface PreviewFooterProps {
    onClose: () => void;
    onDownload: () => void;
}

const PreviewFooter: React.FC<PreviewFooterProps> = ({ onClose, onDownload }) => {
    const { getThemedClass } = useThemedStyles();

    return (
        <footer className={`${getThemedClass('bg-gray-800', 'bg-gray-200')} p-4 flex justify-center space-x-4`}>
            <Button onClick={onClose}>Close</Button>
            <Button onClick={onDownload}>Download</Button>
        </footer>
    );
};

export default Preview;