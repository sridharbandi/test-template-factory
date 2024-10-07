export const getLanguage = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'js': return 'javascript';
        case 'ts': return 'typescript';
        case 'jsx': return 'javascript';
        case 'tsx': return 'typescript';
        case 'html': return 'html';
        case 'css': return 'css';
        case 'json': return 'json';
        case 'xml': return 'xml';
        case 'md': return 'markdown';
        case 'py': return 'python';
        case 'java': return 'java';
        case 'properties': return 'properties';
        case 'gradle': return 'groovy';
        case 'cs': return 'csharp';
        case 'go': return 'go';
        case 'rb': return 'ruby';
        case 'php': return 'php';
        case 'rs': return 'rust';
        case 'scala': return 'scala';
        case 'swift': return 'swift';
        case 'vb': return 'vb';
        case 'sql': return 'sql';
        case 'yaml': return 'yaml';
        case 'yml': return 'yaml';
        case 'bat': return 'powershell';
        default: return 'bash';
    }
};
