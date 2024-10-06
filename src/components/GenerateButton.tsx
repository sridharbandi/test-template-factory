import React from 'react';
import { useThemedStyles } from '../hooks/useThemedStyles';

interface GenerateButtonProps {
    onClick: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick }) => {
    const { getThemedClass } = useThemedStyles();
    return (
        <button
            onClick={onClick}
            className={`border ${getThemedClass('border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white', 'border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white')} font-bold py-2 px-4 rounded`}
        >
            Generate Template
        </button>
    );
};

export default GenerateButton;