import React from 'react';
import Image from 'next/image';
import Logo from '../assets/logo.svg';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import BurgerMenuSlide from './BurgerMenuSlide';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { FaGithub } from 'react-icons/fa';

interface HeaderProps {
    toggleBurgerMenu: () => void;
    showBurgerMenu: boolean;
    toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleBurgerMenu, showBurgerMenu, toggleTheme }) => {
    const { getThemedClass } = useThemedStyles();

    const iconClass = `${getThemedClass('text-violet-400 hover:text-violet-300', 'text-violet-600 hover:text-violet-500')} transition-colors duration-200`;

    return (
        <>
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
                <div className="flex items-center">
                    <a
                        href="https://github.com/yourusername/your-repo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mr-4 ${iconClass}`}
                        aria-label="GitHub repository"
                    >
                        <FaGithub className="h-10 w-10" />
                    </a>
                    <button 
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className={`mr-4 ${iconClass}`}
                    >
                        {getThemedClass(<SunIcon className="h-10 w-10" />, <MoonIcon className="h-10 w-10" />)}
                    </button>
                    <button 
                        onClick={toggleBurgerMenu}
                        aria-label={showBurgerMenu ? "Close menu" : "Open menu"}
                        className={iconClass}
                    >
                        {showBurgerMenu ? <XMarkIcon className="h-10 w-10" /> : <Bars3Icon className="h-10 w-10" />}
                    </button>
                </div>
            </header>
            <BurgerMenuSlide showBurgerMenu={showBurgerMenu} onClose={toggleBurgerMenu} toggleTheme={toggleTheme} />
        </>
    );
};

export default Header;