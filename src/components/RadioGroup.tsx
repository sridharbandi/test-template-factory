import React from 'react';
import { useTheme } from './ThemeProvider';

interface RadioGroupProps {
    label: string;
    options: string[];
    selectedOption: string;
    onChange: (option: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ label, options, selectedOption, onChange }) => {
    const { theme } = useTheme();
    return (
        <div className={`mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            <label className="block mb-2 font-bold">{label}</label>
            {options.map((option) => (
                <div key={option} className="mb-2">
                    <label className={`inline-flex items-center cursor-pointer ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <input
                            type="radio"
                            className="hidden"
                            name={label}
                            value={option}
                            checked={selectedOption === option}
                            onChange={() => onChange(option)}
                        />
                        <span className={`w-4 h-4 inline-block mr-2 rounded-full ${selectedOption === option ? 'bg-violet-500' : 'border border-violet-500'}`}></span>
                        <span>{option}</span>
                    </label>
                </div>
            ))}
        </div>
    );
};

export default RadioGroup;
