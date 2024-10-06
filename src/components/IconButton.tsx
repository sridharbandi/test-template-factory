import React from 'react';
import { useThemedStyles } from '../hooks/useThemedStyles';

interface IconButtonProps {
    onClick: () => void;
    title: string;
    icon: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = React.memo(({ onClick, title, icon }) => {
    const { getThemedClass } = useThemedStyles();
    return (
        <button
            onClick={onClick}
            className={`p-2 rounded-full ${getThemedClass('text-violet-500 hover:bg-violet-500 hover:text-white', 'text-violet-600 hover:bg-violet-600 hover:text-white')}`}
            title={title}
        >
            {icon}
        </button>
    );
});

IconButton.displayName = 'IconButton';

export default IconButton;
