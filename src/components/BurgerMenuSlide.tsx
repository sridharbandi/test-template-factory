import React from 'react';
import BurgerMenuContent from './BurgerMenuContent';

interface BurgerMenuSlideProps {
    showBurgerMenu: boolean;
    onClose: () => void;
    toggleTheme: () => void;
}

const BurgerMenuSlide: React.FC<BurgerMenuSlideProps> = ({ showBurgerMenu, onClose, toggleTheme }) => (
    <div className={`burger-menu-slide ${showBurgerMenu ? 'show' : ''} fixed inset-0 z-40`}>
        <BurgerMenuContent onClose={onClose} toggleTheme={toggleTheme} />
    </div>
);

export default BurgerMenuSlide;
