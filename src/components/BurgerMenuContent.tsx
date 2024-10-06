import React from 'react';
import { useThemedStyles } from '../hooks/useThemedStyles';
import Image from 'next/image';
import Logo from '../assets/logo.svg';

interface BurgerMenuContentProps {
    onClose: () => void;
}

const BurgerMenuContent: React.FC<BurgerMenuContentProps> = ({ onClose }) => {
    const { getThemedClass } = useThemedStyles();

    return (
        <div className={`fixed inset-0 z-50 ${getThemedClass('bg-gray-900 text-gray-100', 'bg-white text-gray-900')} overflow-y-auto`}>
            <div className="min-h-screen ml-16 py-8 px-4">
                <div className="container mx-auto">
                    <div className={`flex justify-between items-center mb-8 pb-4 border-b ${getThemedClass('border-gray-700', 'border-gray-300')}`}>
                        <div className="flex items-center">
                            <Image src={Logo} alt="Logo" width={48} height={48} className="mr-4" />
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
                    </div>
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
