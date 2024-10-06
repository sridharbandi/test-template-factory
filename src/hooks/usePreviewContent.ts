import { useMemo } from 'react';
import { getLanguage } from '../utils/languageUtils';

export const usePreviewContent = (selectedFile: string | null, fileContent: string | null) => {
    const language = useMemo(() => selectedFile ? getLanguage(selectedFile) : null, [selectedFile]);
    const isMarkdown = useMemo(() => selectedFile?.toLowerCase().endsWith('.md'), [selectedFile]);

    return { language, isMarkdown };
};
