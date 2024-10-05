import React from 'react';
import { useTheme } from './ThemeProvider'
import Button from './Button';

interface FooterProps {
    onGenerate: () => void;
    onPreview: () => void;
}

const Footer: React.FC<FooterProps> = ({ onGenerate, onPreview }) => {
    const { theme } = useTheme();
    return (
        <footer className={`fixed bottom-0 left-0 sm:left-16 right-0 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} p-4`}>
            <div className="container mx-auto flex justify-center items-center space-x-4">
                <Button onClick={onPreview}>Preview</Button>
                <Button onClick={onGenerate}>Generate Template</Button>
            </div>
        </footer>
    );
};

export default Footer;