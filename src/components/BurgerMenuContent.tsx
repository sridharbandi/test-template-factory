import React from 'react';
import { useThemedStyles } from '../hooks/useThemedStyles';
import Image from 'next/image';
import Logo from '../assets/logo.svg';
import Header from './Header';

interface BurgerMenuContentProps {
    onClose: () => void;
}

const BurgerMenuContent: React.FC<BurgerMenuContentProps> = ({ onClose }) => {
    const { getThemedClass } = useThemedStyles();

    return (
        <div className={`fixed inset-0 z-50 ${getThemedClass('bg-gray-900 text-gray-100', 'bg-white text-gray-900')} overflow-y-auto`}>
            <div className="min-h-screen ml-16 py-8 px-4">
                <div className="container mx-auto">
                    <Header />
                    <div className="prose max-w-none">
                        <p className="mb-8">
                            Test Template Factory is a powerful tool designed to streamline the process of setting up test automation frameworks.
                            With just a few clicks, you can generate a complete project structure tailored to your specific needs,
                            saving valuable time and ensuring consistency across your testing projects.
                            {/* ... (rest of the content remains unchanged) ... */}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BurgerMenuContent;
