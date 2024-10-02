import React from 'react';

interface RadioGroupProps {
    label: string;
    options: string[];
    selectedOption: string;
    onChange: (option: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ label, options, selectedOption, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="space-y-2">
                {options.map((option) => (
                    <div key={option} className="flex items-center">
                        <input
                            type="radio"
                            id={`${label}-${option}`}
                            name={label}
                            value={option}
                            checked={selectedOption === option}
                            onChange={() => onChange(option)}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <label htmlFor={`${label}-${option}`} className="ml-2 block text-sm text-gray-900">
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadioGroup;
