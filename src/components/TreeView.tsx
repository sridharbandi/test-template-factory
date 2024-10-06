import React from 'react';
import { TreeItem } from '../types';
import { FolderIcon, DocumentIcon, ChevronRightIcon, ChevronDownIcon, FolderOpenIcon } from '@heroicons/react/24/outline';
import { useThemedStyles } from '../hooks/useThemedStyles';

interface TreeViewProps {
    items: TreeItem[];
    expandedFolders: Set<string>;
    selectedFile: string | null;
    onToggleFolder: (path: string) => void;
    onSelectFile: (path: string, url: string) => void;
}

const TreeView: React.FC<TreeViewProps> = ({ items, expandedFolders, selectedFile, onToggleFolder, onSelectFile }) => {
    const { getThemedClass } = useThemedStyles();

    const renderTree = (items: TreeItem[], path: string = '') => {
        return items.map((item) => {
            const currentPath = path ? `${path}/${item.path}` : item.path;
            if (item.type === 'tree') {
                const isExpanded = expandedFolders.has(currentPath);
                return (
                    <li key={currentPath}>
                        <div
                            className={`flex items-center cursor-pointer ${getThemedClass('hover:bg-gray-700', 'hover:bg-gray-200')} p-1`}
                            onClick={() => onToggleFolder(currentPath)}
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
                        className={`flex items-center cursor-pointer ${getThemedClass('hover:bg-gray-700', 'hover:bg-gray-200')} p-1 ${selectedFile === currentPath ? 'text-violet-400 font-bold' : ''}`}
                        onClick={() => onSelectFile(currentPath, item.url)}
                    >
                        <DocumentIcon className="h-5 w-5 mr-2 text-violet-500" />
                        {item.path}
                    </li>
                );
            }
        });
    };

    return (
        <ul className="space-y-2">
            {renderTree(items)}
        </ul>
    );
};

export default TreeView;
