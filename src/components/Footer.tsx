import React from 'react';
import Button from './Button';
import { useThemedStyles } from '../hooks/useThemedStyles';

interface FooterProps {
    onDownload: () => void;
    onPreview: () => void;
}

const Footer: React.FC<FooterProps> = ({ onDownload, onPreview }) => {
    const { getThemedClass } = useThemedStyles();
    return (
        <footer className={`fixed bottom-0 left-0 right-0 ${getThemedClass('bg-gray-800', 'bg-gray-200')} p-4`}>
            <div className="container mx-auto flex justify-center items-center space-x-4">
                <Button onClick={onPreview}>Preview</Button>
                <Button onClick={onDownload}>Download</Button>
            </div>
        </footer>
    );
};

export default Footer;
