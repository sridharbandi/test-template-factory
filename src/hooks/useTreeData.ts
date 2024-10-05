import { useState, useEffect } from 'react';
import { ProjectConfig, TreeItem } from '../types';

export const useTreeData = (config: ProjectConfig) => {
    const [treeData, setTreeData] = useState<TreeItem[]>([]);
    const [error, setError] = useState<string | null>(null);

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

    return { treeData, error };
};
