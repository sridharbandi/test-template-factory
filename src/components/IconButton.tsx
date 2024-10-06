import React from 'react';
import { useTheme } from './ThemeProvider';

interface IconButtonProps {
    onClick: () => void;
    title: string;
    icon: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, title, icon }) => {
    const { theme } = useTheme();
    return (
        <button
            onClick={onClick}
            className={`p-2 rounded-full ${theme === 'dark' ? 'text-violet-500 hover:bg-violet-500 hover:text-white' : 'text-violet-600 hover:bg-violet-600 hover:text-white'}`}
            title={title}
        >
            {icon}
        </button>
    );
};

export default IconButton;
