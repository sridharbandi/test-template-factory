export const getLanguage = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'js': return 'javascript';
        case 'ts': return 'typescript';
        case 'jsx': return 'jsx';
        case 'tsx': return 'tsx';
        case 'html': return 'html';
        case 'css': return 'css';
        case 'json': return 'json';
        case 'xml': return 'xml';
        case 'md': return 'markdown';
        case 'py': return 'python';
        case 'java': return 'java';
        default: return 'text';
    }
};
