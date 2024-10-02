import React from 'react';
import { BuildTool } from '../types';
import { BUILD_TOOLS } from '../utils/constants';

interface BuildToolSelectorProps {
    selectedBuildTool: BuildTool;
    onBuildToolChange: (buildTool: BuildTool) => void;
}

const BuildToolSelector: React.FC<BuildToolSelectorProps> = ({ selectedBuildTool, onBuildToolChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Build Tool</label>
            <select
                value={selectedBuildTool}
                onChange={(e) => onBuildToolChange(e.target.value as BuildTool)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
                {BUILD_TOOLS.map((buildTool) => (
                    <option key={buildTool} value={buildTool}>
                        {buildTool.charAt(0).toUpperCase() + buildTool.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default BuildToolSelector;
