import React, { useState } from 'react';
import { Bars3Icon, SunIcon, MoonIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { FaGithub } from 'react-icons/fa';
import BurgerMenuContent from './BurgerMenuContent';
import { useThemedStyles } from '../hooks/useThemedStyles';

interface SideBarProps {
    toggleTheme: () => void;
}

interface SideBarContentProps {
    toggleTheme: () => void;
    toggleBurgerMenu: () => void;
    showBurgerMenu: boolean;
}



const SideBar: React.FC<SideBarProps> = ({ toggleTheme }) => {
    const { getThemedClass } = useThemedStyles();
    const [showBurgerMenu, setShowBurgerMenu] = useState(false);

    const toggleBurgerMenu = () => setShowBurgerMenu(!showBurgerMenu);

    return (
        <>
            <SideBarContent
                toggleTheme={toggleTheme}
                toggleBurgerMenu={toggleBurgerMenu}
                showBurgerMenu={showBurgerMenu}
            />
            <BurgerMenuSlide showBurgerMenu={showBurgerMenu} onClose={toggleBurgerMenu} />
        </>
    );
};

const SideBarContent: React.FC<SideBarContentProps> = ({ toggleTheme, toggleBurgerMenu, showBurgerMenu }) => {
    const { getThemedClass } = useThemedStyles();

    return (
        <div className={`hidden sm:flex fixed left-0 top-0 h-full w-16 flex-col items-center py-8 ${getThemedClass('bg-gray-800', 'bg-gray-200')} z-50`}>
            <SideBarButton onClick={toggleBurgerMenu} icon={showBurgerMenu ? <XMarkIcon className="h-10 w-10" /> : <Bars3Icon className="h-10 w-10" />} />
            <SideBarButton onClick={toggleTheme} icon={getThemedClass(<SunIcon className="h-10 w-10" />, <MoonIcon className="h-8 w-8" />)} />
            <SideBarLink href="https://github.com/yourusername/your-repo" icon={<FaGithub className="h-10 w-10" />} />
        </div>
    );
};

interface BurgerMenuSlideProps {
    showBurgerMenu: boolean;
    onClose: () => void;
}

const BurgerMenuSlide: React.FC<BurgerMenuSlideProps> = ({ showBurgerMenu, onClose }) => (
    <div className={`burger-menu-slide ${showBurgerMenu ? 'show' : ''} fixed inset-0 z-40`}>
        <BurgerMenuContent onClose={onClose} />
    </div>
);

interface SideBarButtonProps {
    onClick: () => void;
    icon: React.ReactNode;
}

const SideBarButton: React.FC<SideBarButtonProps> = ({ onClick, icon }) => (
    <button className="mb-8" onClick={onClick}>
        {icon}
    </button>
);

interface SideBarLinkProps {
    href: string;
    icon: React.ReactNode;
}

const SideBarLink: React.FC<SideBarLinkProps> = ({ href, icon }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="mb-8">
        {icon}
    </a>
);

export default SideBar;