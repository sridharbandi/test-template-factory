import React from 'react';
import { useTheme } from './ThemeProvider';
import { Bars3Icon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { FaGithub } from 'react-icons/fa';

interface SideBarProps {
  toggleTheme: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ toggleTheme }) => {
  const { theme } = useTheme();

  return (
    <div className={`fixed left-0 top-0 h-full w-16 flex flex-col items-center py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
      <button className="mb-8">
        <Bars3Icon className="h-10 w-10" />
      </button>
      <button onClick={toggleTheme} className="mb-8">
        {theme === 'dark' ? <SunIcon className="h-10 w-10" /> : <MoonIcon className="h-8 w-8" />}
      </button>
      <a href="https://github.com/yourusername/your-repo" target="_blank" rel="noopener noreferrer" className="mb-8">
        <FaGithub className="h-10 w-10" />
      </a>
    </div>
  );
};

export default SideBar;
