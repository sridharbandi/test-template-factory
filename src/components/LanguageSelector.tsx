import React from 'react';
import { ProgrammingLanguage } from '../types';
import { PROGRAMMING_LANGUAGES } from '../utils/constants';

interface LanguageSelectorProps {
    selectedLanguage: ProgrammingLanguage;
    onLanguageChange: (language: ProgrammingLanguage) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Programming Language</label>
            <select
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e.target.value as ProgrammingLanguage)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
                {PROGRAMMING_LANGUAGES.map((language) => (
                    <option key={language} value={language}>
                        {language.charAt(0).toUpperCase() + language.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;
