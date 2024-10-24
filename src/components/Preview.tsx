import React, { useState, useEffect } from 'react';
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
    isMobile: boolean;
}

const Preview: React.FC<PreviewProps> = ({ config, onClose, onDownload }) => {
    const { fileContent, error: fileError, isLoading: isFileLoading, fetchFileContent } = useFileContent();
    const { treeData, error: treeError, isLoading: isTreeLoading } = useTreeData(config);
    const { expandedFolders, toggleFolder } = useExpandedFolders();
    const { selectedFile, handleSelectFile, handleCopyToClipboard, handleDownloadFile } = useFileOperations();
    const { getThemedClass } = useThemedStyles();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className={`flex flex-col ${getThemedClass('bg-gray-800 text-gray-100', 'bg-white text-gray-900')} h-full ${isMobile ? 'fixed inset-0 overflow-hidden' : ''}`}>
            <div className="flex-grow overflow-hidden flex flex-col md:flex-row">
                <PreviewSidebar
                    treeData={treeData}
                    treeError={treeError}
                    expandedFolders={expandedFolders}
                    selectedFile={selectedFile}
                    onToggleFolder={toggleFolder}
                    onSelectFile={(path: string, url: string) => handleSelectFile(path, url, fetchFileContent)}
                    isLoading={isTreeLoading}
                    isMobile={isMobile}
                />
                <PreviewContent
                    selectedFile={selectedFile}
                    fileContent={fileContent}
                    onCopyToClipboard={() => handleCopyToClipboard(fileContent)}
                    onDownloadFile={() => handleDownloadFile(fileContent, selectedFile)}
                    isLoading={isFileLoading}
                    error={fileError}
                    isMobile={isMobile}
                />
            </div>
            <PreviewFooter onClose={onClose} onDownload={onDownload} isMobile={isMobile} />
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
    isMobile,
}) => {
    const { getThemedClass } = useThemedStyles();

    const flattenTree = (items: TreeItem[], prefix = ''): { path: string; url: string }[] => {
        return items.reduce((acc, item) => {
            const path = prefix ? `${prefix}/${item.path}` : item.path;
            if (item.type === 'blob') {
                acc.push({ path, url: item.url });
            } else if (item.children) {
                acc.push(...flattenTree(item.children, path));
            }
            return acc;
        }, [] as { path: string; url: string }[]);
    };

    const flatFiles = flattenTree(treeData);

    if (isMobile) {
        return (
            <div className={`sticky top-0 z-10 w-full ${getThemedClass('bg-gray-900', 'bg-white')} p-2`}>
                <select
                    className={`w-full p-2 ${getThemedClass('bg-gray-800 text-gray-100', 'bg-white text-gray-900')} border ${getThemedClass('border-gray-700', 'border-gray-300')} rounded`}
                    value={selectedFile || ''}
                    onChange={(e) => {
                        const selected = flatFiles.find(file => file.path === e.target.value);
                        if (selected) {
                            onSelectFile(selected.path, selected.url);
                        }
                    }}
                >
                    <option value="">Select a file</option>
                    {flatFiles.map((file) => (
                        <option 
                            key={file.path} 
                            value={file.path} 
                            disabled={file.path.endsWith('.jar')} // Disable option if file is a .jar
                        >
                            {file.path}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

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
    error: string | null;
    isMobile: boolean;
}

const PreviewContent: React.FC<PreviewContentProps> = ({
    selectedFile,
    fileContent,
    onCopyToClipboard,
    onDownloadFile,
    isLoading,
    error,
    isMobile,
}) => {
    const { getThemedClass } = useThemedStyles();

    return (
        <div className={`w-full md:w-2/3 ${getThemedClass('bg-gray-900', 'bg-white')} ${isMobile ? 'py-6 px-2' : 'p-6'} overflow-auto`}>
            <FilePreview
                selectedFile={selectedFile}
                fileContent={fileContent}
                onCopyToClipboard={onCopyToClipboard}
                onDownloadFile={onDownloadFile}
                isLoading={isLoading}
                error={error}
                isMobile={isMobile}
            />
        </div>
    );
};

interface PreviewFooterProps {
    onClose: () => void;
    onDownload: () => void;
    isMobile: boolean;
}

const PreviewFooter: React.FC<PreviewFooterProps> = ({ onClose, onDownload, isMobile }) => {
    const { getThemedClass } = useThemedStyles();

    return (
        <footer className={`${getThemedClass('bg-gray-800', 'bg-gray-200')} ${isMobile ? 'fixed bottom-0 left-0 right-0' : ''} p-4`}>
            <div className="container mx-auto flex justify-center items-center space-x-4">
                <Button onClick={onClose}>Close</Button>
                <Button onClick={onDownload}>Download</Button>
            </div>
        </footer>
    );
};

export default Preview;