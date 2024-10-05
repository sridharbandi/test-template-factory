import { useState, useCallback } from 'react';

export const useFileContent = () => {
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchFileContent = useCallback(async (url: string) => {
        try {
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/vnd.github.v3.raw',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const content = await response.text();
            setFileContent(content);
            setError(null);
        } catch (error) {
            console.error('Error fetching file content:', error);
            setError('Failed to fetch file content. Please try again.');
        }
    }, []);

    return { fileContent, error, fetchFileContent };
};
