import React from 'react';
import Image from 'next/image';
import Logo from '../assets/logo.svg';
import { useThemedStyles } from '../hooks/useThemedStyles';

const Header: React.FC = () => {
    const { getThemedClass } = useThemedStyles();

    return (
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
        </header>
    );
};

export default Header;