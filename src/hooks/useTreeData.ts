import { useState, useEffect } from 'react';
import { ProjectConfig, TreeItem } from '../types';

export const useTreeData = (config: ProjectConfig) => {
    const [treeData, setTreeData] = useState<TreeItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchRepoTree(config);
    }, [config]);

    const fetchRepoTree = async (config: ProjectConfig) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/github-api?action=tree&tool=${config.tool}&language=${config.language}&build=${config.buildTool}&runner=${config.runner}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch GitHub tree');
            }

            const data = await response.json();
            const processedData = processTreeData(data.tree);
            setTreeData(processedData);
        } catch (error) {
            console.error('Error fetching repo tree:', error);
            setError('Failed to fetch repository tree. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const processTreeData = (items: any[]): TreeItem[] => {
        const root: TreeItem[] = [];

        items.forEach(item => {
            const parts = item.path.split('/');
            let current = root;

            parts.forEach((part: string, index: number) => {
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

    return { treeData, error, isLoading };
};