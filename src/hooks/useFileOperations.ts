import { useState } from 'react';
import { downloadFile, copyToClipboard } from '../utils/fileUtils';

export const useFileOperations = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleSelectFile = (path: string, url: string, fetchFileContent: (url: string) => void) => {
    setSelectedFile(path);
    fetchFileContent(url);
  };

  const handleCopyToClipboard = (fileContent: string | null) => {
    if (fileContent) {
      copyToClipboard(fileContent);
    }
  };

  const handleDownloadFile = (fileContent: string | null, selectedFile: string | null) => {
    if (fileContent && selectedFile) {
      const fileName = selectedFile.split('/').pop() || 'download';
      downloadFile(fileContent, fileName);
    }
  };

  return {
    selectedFile,
    handleSelectFile,
    handleCopyToClipboard,
    handleDownloadFile,
  };
};
