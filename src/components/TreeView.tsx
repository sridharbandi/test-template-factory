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

const TreeViewItem: React.FC<{
    item: TreeItem;
    path: string;
    isExpanded: boolean;
    isSelected: boolean;
    onToggle: () => void;
    onSelect: () => void;
    renderChildren: () => React.ReactNode;
}> = React.memo(({ item, path, isExpanded, isSelected, onToggle, onSelect, renderChildren }) => {
    const { getThemedClass } = useThemedStyles();

    const handleFileClick = () => {
        if (item.path.endsWith('.jar')) {
            // Prevent selection for .jar files
            return;
        }
        onSelect();
    };

    if (item.type === 'tree') {
        return (
            <li>
                <div
                    className={`flex items-center cursor-pointer ${getThemedClass('hover:bg-gray-700', 'hover:bg-gray-200')} p-1`}
                    onClick={onToggle}
                    role="button"
                    aria-expanded={isExpanded}
                >
                    {isExpanded ? (
                        <ChevronDownIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                    ) : (
                        <ChevronRightIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                    )}
                    {isExpanded ? (
                        <FolderOpenIcon className="h-5 w-5 mr-2 text-yellow-500" aria-hidden="true" />
                    ) : (
                        <FolderIcon className="h-5 w-5 mr-2 text-yellow-500" aria-hidden="true" />
                    )}
                    {item.path}
                </div>
                {isExpanded && (
                    <ul className="ml-4" role="group">
                        {renderChildren()}
                    </ul>
                )}
            </li>
        );
    } else {
        return (
            <li
                className={`flex items-center cursor-pointer ${getThemedClass('hover:bg-gray-700', 'hover:bg-gray-200')} p-1 ${isSelected ? 'text-violet-400 font-bold' : ''} ${item.path.endsWith('.jar') ? 'file-item disabled' : ''}`}
                onClick={handleFileClick}
                role="button"
                aria-selected={isSelected}
            >
                <DocumentIcon className="h-5 w-5 mr-2 text-violet-500" aria-hidden="true" />
                {item.path}
            </li>
        );
    }
});

const TreeView: React.FC<TreeViewProps> = ({ items, expandedFolders, selectedFile, onToggleFolder, onSelectFile }) => {
    const renderTree = (items: TreeItem[], path: string = ''): React.ReactNode => {
        return items.map((item) => {
            const currentPath = path ? `${path}/${item.path}` : item.path;
            const isExpanded = expandedFolders.has(currentPath);
            const isSelected = selectedFile === currentPath;

            return (
                <TreeViewItem
                    key={currentPath}
                    item={item}
                    path={currentPath}
                    isExpanded={isExpanded}
                    isSelected={isSelected}
                    onToggle={() => onToggleFolder(currentPath)}
                    onSelect={() => onSelectFile(currentPath, item.url)}
                    renderChildren={() => renderTree(item.children || [], currentPath)}
                />
            );
        });
    };

    return (
        <ul className="space-y-2" role="tree">
            {renderTree(items)}
        </ul>
    );
};

export default React.memo(TreeView);
