import React from 'react';
import Image from 'next/image';
import Logo from '../assets/logo.svg';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { MoonIcon, SunIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface BurgerMenuContentProps {
    onClose: () => void;
    toggleTheme: () => void;
}

const BurgerMenuContent: React.FC<BurgerMenuContentProps> = ({ onClose, toggleTheme }) => {
    const { getThemedClass } = useThemedStyles();

    const iconClass = `${getThemedClass('text-violet-400 hover:text-violet-300', 'text-violet-600 hover:text-violet-500')} transition-colors duration-200`;

    return (
        <div className={`fixed inset-0 z-50 ${getThemedClass('bg-gray-900 text-gray-100', 'bg-white text-gray-900')} overflow-y-auto`}>
            <div className="min-h-screen p-4">
                <div className="container mx-auto">
                    <header className={`flex justify-between items-center mb-8 pb-4 border-b ${getThemedClass('border-gray-700', 'border-gray-300')}`}>
                        <div className="flex items-center">
                            <Image src={Logo} alt="Test Template Factory Logo" width={48} height={48} className="mr-4" />
                            <div>
                                <h1 className="text-4xl font-bold">
                                    <span className="hidden sm:inline">
                                        <span className={getThemedClass('text-violet-400', 'text-violet-600')}>T</span>est{' '}
                                        <span className={getThemedClass('text-violet-400', 'text-violet-600')}>T</span>emplate{' '}
                                        <span className={getThemedClass('text-violet-400', 'text-violet-600')}>F</span>actory
                                    </span>
                                    <span className="sm:hidden">
                                        <span className={getThemedClass('text-violet-400', 'text-violet-600')}>TTF</span>
                                    </span>
                                </h1>
                                <p className={`text-sm italic mt-2 ${getThemedClass('text-violet-400', 'text-violet-600')} hidden sm:block`}>
                                    Kickstart automation frameworks in just a few clicks
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            aria-label="Close menu"
                            className={iconClass}
                        >
                            <XMarkIcon className="h-10 w-10" />
                        </button>
                    </header>
                    <div className="prose max-w-none">
                        <p className="mb-8">
                            Test Template Factory is a powerful tool designed to streamline the process of setting up test automation frameworks.
                            With just a few clicks, you can generate a complete project structure tailored to your specific needs,
                            saving valuable time and ensuring consistency across your testing projects.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BurgerMenuContent;