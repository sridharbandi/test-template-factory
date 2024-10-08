import React from 'react';
import { AutomationTool } from '../types';
import { AUTOMATION_TOOLS } from '../utils/constants';

interface ToolSelectorProps {
    selectedTool: AutomationTool;
    onToolChange: (tool: AutomationTool) => void;
}

const ToolSelector: React.FC<ToolSelectorProps> = ({ selectedTool, onToolChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Automation Tool</label>
            <select
                value={selectedTool}
                onChange={(e) => onToolChange(e.target.value as AutomationTool)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
                {AUTOMATION_TOOLS.map((tool) => (
                    <option key={tool} value={tool}>
                        {tool.charAt(0).toUpperCase() + tool.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ToolSelector;
