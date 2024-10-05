import React from 'react';
import { useTheme } from './ThemeProvider';
import Image from 'next/image';
import Logo from '../assets/logo.svg';

interface BurgerMenuContentProps {
  onClose: () => void;
}

const BurgerMenuContent: React.FC<BurgerMenuContentProps> = ({ onClose }) => {
  const { theme } = useTheme();

  return (
    <div className={`fixed inset-0 z-50 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} overflow-y-auto`}>
      <div className="min-h-screen ml-16 py-8 px-4">
        <div className="container mx-auto">
          <div className={`flex justify-between items-center mb-8 pb-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
            <div className="flex items-center">
              <Image src={Logo} alt="Logo" width={48} height={48} className="mr-4" />
              <div>
                <h1 className="text-4xl font-bold">Test Template Factory</h1>
                <p className={`text-sm italic mt-2 ${theme === 'dark' ? 'text-violet-400' : 'text-violet-600'}`}>
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
          Test Template Factory is a powerful tool designed to streamline the process of setting up test automation frameworks. 
          With just a few clicks, you can generate a complete project structure tailored to your specific needs, 
          saving valuable time and ensuring consistency across your testing projects.
        
          Test Template Factory is a powerful tool designed to streamline the process of setting up test automation frameworks. 
          With just a few clicks, you can generate a complete project structure tailored to your specific needs, 
          saving valuable time and ensuring consistency across your testing projects.
        
          Test Template Factory is a powerful tool designed to streamline the process of setting up test automation frameworks. 
          With just a few clicks, you can generate a complete project structure tailored to your specific needs, 
          saving valuable time and ensuring consistency across your testing projects.
        
          Test Template Factory is a powerful tool designed to streamline the process of setting up test automation frameworks. 
          With just a few clicks, you can generate a complete project structure tailored to your specific needs, 
          saving valuable time and ensuring consistency across your testing projects.
        
          Test Template Factory is a powerful tool designed to streamline the process of setting up test automation frameworks. 
          With just a few clicks, you can generate a complete project structure tailored to your specific needs, 
          saving valuable time and ensuring consistency across your testing projects.
        
          Test Template Factory is a powerful tool designed to streamline the process of setting up test automation frameworks. 
          With just a few clicks, you can generate a complete project structure tailored to your specific needs, 
          saving valuable time and ensuring consistency across your testing projects.
        
          Test Template Factory is a powerful tool designed to streamline the process of setting up test automation frameworks. 
          With just a few clicks, you can generate a complete project structure tailored to your specific needs, 
          saving valuable time and ensuring consistency across your testing projects.
        
          Test Template Factory is a powerful tool designed to streamline the process of setting up test automation frameworks. 
          With just a few clicks, you can generate a complete project structure tailored to your specific needs, 
          saving valuable time and ensuring consistency across your testing projects.
        
          Test Template Factory is a powerful tool designed to streamline the process of setting up test automation frameworks. 
          With just a few clicks, you can generate a complete project structure tailored to your specific needs, 
          saving valuable time and ensuring consistency across your testing projects.
        
          Test Template Factory is a powerful tool designed to streamline the process of setting up test automation frameworks. 
          With just a few clicks, you can generate a complete project structure tailored to your specific needs, 
          saving valuable time and ensuring consistency across your testing projects.
        
          Test Template Factory is a powerful tool designed to streamline the process of setting up test automation frameworks. 
          With just a few clicks, you can generate a complete project structure tailored to your specific needs, 
          saving valuable time and ensuring consistency across your testing projects.
        
          Test Template Factory is a powerful tool designed to streamline the process of setting up test automation frameworks. 
          With just a few clicks, you can generate a complete project structure tailored to your specific needs, 
          saving valuable time and ensuring consistency across your testing projects.
        
          Test Template Factory is a powerful tool designed to streamline the process of setting up test automation frameworks. 
          With just a few clicks, you can generate a complete project structure tailored to your specific needs, 
          saving valuable time and ensuring consistency across your testing projects.
        
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
