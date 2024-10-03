import React from 'react';

interface FooterProps {
    onGenerate: () => void;
    onPreview: () => void;
}

const Footer: React.FC<FooterProps> = ({ onGenerate, onPreview }) => {
    return (
        <footer className="bg-gray-200 p-4 mt-8">
            <div className="container mx-auto flex justify-center items-center space-x-4">
                <button
                    onClick={onPreview}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Preview
                </button>
                <button
                    onClick={onGenerate}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    Generate Template
                </button>
            </div>
        </footer>
    );
};

export default Footer;
