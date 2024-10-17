export const downloadFile = (content: string, fileName: string) => {
    const blob = new Blob([content], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export const copyToClipboard = async (content: string): Promise<void> => {
    try {
        await navigator.clipboard.writeText(content);
        console.log('Copied to clipboard');
    } catch (err) {
        console.error('Could not copy text: ', err);
    }
};
