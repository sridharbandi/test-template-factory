import React from 'react';

interface GenerateButtonProps {
    onClick: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
            Generate Template
        </button>
    );
};

export default GenerateButton;
