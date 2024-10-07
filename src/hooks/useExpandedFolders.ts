import { useState } from 'react';

export const useExpandedFolders = () => {
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

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

    return { expandedFolders, toggleFolder };
};
