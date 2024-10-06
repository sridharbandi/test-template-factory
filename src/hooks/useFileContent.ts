import { useState, useCallback } from 'react';

export const useFileContent = () => {
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchFileContent = useCallback(async (url: string) => {
        setError(null);
        try {
            const response = await fetch(`/api/github-api?action=content&url=${encodeURIComponent(url)}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch file content');
            }

            const data = await response.json();
            setFileContent(data.content);
        } catch (error) {
            console.error('Error fetching file content:', error);
            setError('Failed to fetch file content. Please try again.');
        }
    }, []);

    return { fileContent, error, fetchFileContent };
};
