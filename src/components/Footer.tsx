import React from 'react';
import { useTheme } from './ThemeProvider'

interface FooterProps {
    onGenerate: () => void;
    onPreview: () => void;
}

const Footer: React.FC<FooterProps> = ({ onGenerate, onPreview }) => {
    const { theme } = useTheme();
    return (
        <footer className={`fixed bottom-0 left-0 sm:left-16 right-0 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} p-4`}>
            <div className="container mx-auto flex justify-center items-center space-x-4">
                <button
                    onClick={onPreview}
                    className={`border ${theme === 'dark' ? 'border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white' : 'border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white'} font-bold py-2 px-4 rounded`}
                >
                    Preview
                </button>
                <button
                    onClick={onGenerate}
                    className={`border ${theme === 'dark' ? 'border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white' : 'border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white'} font-bold py-2 px-4 rounded`}
                >
                    Generate Template
                </button>
            </div>
        </footer>
    );
};

export default Footer;