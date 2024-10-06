import React, { useState } from 'react';
import { Bars3Icon, SunIcon, MoonIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { FaGithub } from 'react-icons/fa';
import BurgerMenuContent from './BurgerMenuContent';
import { useThemedStyles } from '../hooks/useThemedStyles';

interface SideBarProps {
    toggleTheme: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ toggleTheme }) => {
    const { getThemedClass } = useThemedStyles();
    const [showBurgerMenu, setShowBurgerMenu] = useState(false);
    const toggleBurgerMenu = () => {
        setShowBurgerMenu(!showBurgerMenu);
    };

    return (
        <>
            <div className={`hidden sm:flex fixed left-0 top-0 h-full w-16 flex-col items-center py-8 ${getThemedClass('bg-gray-800', 'bg-gray-200')} z-50`}>
                <button className="mb-8"
                    onClick={toggleBurgerMenu}
                >
                    {showBurgerMenu ? <XMarkIcon className="h-10 w-10" /> : <Bars3Icon className="h-10 w-10" />}
                </button>

                <button onClick={toggleTheme} className="mb-8">
                    {getThemedClass(<SunIcon className="h-10 w-10" />, <MoonIcon className="h-8 w-8" />)}
                </button>
                <a href="https://github.com/yourusername/your-repo" target="_blank" rel="noopener noreferrer" className="mb-8">
                    <FaGithub className="h-10 w-10" />
                </a>
            </div>
            <div className={`burger-menu-slide ${showBurgerMenu ? 'show' : ''} fixed inset-0 z-40`}>
                <BurgerMenuContent onClose={toggleBurgerMenu} />
            </div>
        </>
    );
};

export default SideBar;
