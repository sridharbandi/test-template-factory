import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import RadioGroup from '../components/RadioGroup';
import { ProjectConfig } from '../types';
import configData from '../utils/config.json'; // Import the JSON configuration
import Preview from '../components/Preview';
import { useTheme } from '../components/ThemeProvider';
import { useThemedStyles } from '../hooks/useThemedStyles';
import Header from '../components/Header';
import Favicon from '../assets/favicon.ico';

const Home: React.FC = () => {
    const [config, setConfig] = useState<ProjectConfig>({
        tool: 'selenium',
        language: 'java',
        buildTool: 'maven',
        runner: 'junit',
    });
    const { theme, toggleTheme } = useTheme();
    const { getThemedClass } = useThemedStyles();
    const [showPreview, setShowPreview] = useState(false);
    const [showBurgerMenu, setShowBurgerMenu] = useState(false);
    const [isOverflowHidden, setIsOverflowHidden] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const toggleBurgerMenu = () => {
        setShowBurgerMenu(!showBurgerMenu);
        setIsOverflowHidden(!showBurgerMenu);
    };

    useEffect(() => {
        const savedConfig = localStorage.getItem('projectConfig');
        if (savedConfig) {
            setConfig(JSON.parse(savedConfig));
        } else {
            // Load from config if local storage is empty
            const defaultConfig = {
                tool: configData.automationTools[0].name, // Default to the first tool
                language: configData.automationTools[0].languages[0].name, // Default to the first language
                buildTool: configData.automationTools[0].languages[0].buildTools[0], // Default to the first build tool
                runner: configData.automationTools[0].languages[0].runners[0], // Default to the first runner
            };
            setConfig(defaultConfig);
            localStorage.setItem('projectConfig', JSON.stringify(defaultConfig));
        }
    }, []);

    const handleConfigChange = (key: keyof ProjectConfig) => (value: string) => {
        setConfig(prevConfig => {
            const newConfig = { ...prevConfig, [key]: value };

            if (key === 'tool') {
                const selectedTool = configData.automationTools.find(tool => tool.name === value);
                if (selectedTool) {
                    newConfig.language = selectedTool.languages[0].name; // Default to the first language
                    newConfig.buildTool = selectedTool.languages[0].buildTools[0]; // Default to the first build tool
                    newConfig.runner = selectedTool.languages[0].runners[0]; // Default to the first runner
                }
            }

            localStorage.setItem('projectConfig', JSON.stringify(newConfig));
            return newConfig;
        });
    };

    const getLanguageOptions = () => {
        const selectedTool = configData.automationTools.find(tool => tool.name === config.tool);
        return selectedTool ? selectedTool.languages.map(lang => lang.name) : [];
    };

    const getBuildToolOptions = () => {
        const selectedTool = configData.automationTools.find(tool => tool.name === config.tool);
        const selectedLanguage = selectedTool?.languages.find(lang => lang.name === config.language);
        return selectedLanguage ? selectedLanguage.buildTools : [];
    };

    const getRunnerOptions = () => {
        const selectedTool = configData.automationTools.find(tool => tool.name === config.tool);
        const selectedLanguage = selectedTool?.languages.find(lang => lang.name === config.language);
        return selectedLanguage ? selectedLanguage.runners : [];
    };

    const handleDownload = async () => {
        try {
            const response = await fetch('/api/github-api?action=download');
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Selenium-Serenity-Junit-Template.zip'; // Set the desired file name
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                console.error('Failed to download the project');
            }
        } catch (error) {
            console.error('Error downloading the project:', error);
        }
    };

    const handlePreview = () => {
        setShowPreview(true);
        setIsExiting(false);
        document.body.style.overflow = 'hidden'; // Prevent scrolling on body
    };

    const handleClosePreview = () => {
        setIsExiting(true);
        setTimeout(() => {
            setShowPreview(false);
            setIsExiting(false);
            document.body.style.overflow = ''; // Restore scrolling
        }, 500); // Match the duration of the exit animation
    };

    return (
        <div className={`flex ${getThemedClass('bg-gray-900 text-gray-100', 'bg-white text-gray-900')} ${isOverflowHidden ? 'overflow-hidden h-screen' : ''}`}>
            <div className="flex-1 min-h-screen pb-20">
                <Head>
                    <title>Test Template Factory</title>
                    <link rel="icon" href={Favicon.src} type="image/x-icon" />
                </Head>

                <main className="flex-grow container mx-auto p-4">
                    <Header toggleBurgerMenu={toggleBurgerMenu} showBurgerMenu={showBurgerMenu} toggleTheme={toggleTheme} />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <RadioGroup
                            label="Tool"
                            options={configData.automationTools.map(tool => tool.name)}
                            selectedOption={config.tool}
                            onChange={handleConfigChange('tool')}
                        />
                        <RadioGroup
                            label="Language"
                            options={getLanguageOptions()}
                            selectedOption={config.language}
                            onChange={handleConfigChange('language')}
                        />
                        <RadioGroup
                            label="Build"
                            options={getBuildToolOptions()}
                            selectedOption={config.buildTool}
                            onChange={handleConfigChange('buildTool')}
                        />
                        <RadioGroup
                            label="Runner"
                            options={getRunnerOptions()}
                            selectedOption={config.runner}
                            onChange={handleConfigChange('runner')}
                        />
                    </div>
                </main>
                <Footer onDownload={handleDownload} onPreview={handlePreview} />
                {/* Always Render the Preview Slide */}
                <div className={`preview-slide ${showPreview ? 'show' : ''} ${isExiting ? 'exit' : ''}`}>
                    {/* Overlay */}
                    <div
                        className={`absolute inset-0 ${getThemedClass('bg-black bg-opacity-50', 'bg-gray-300 bg-opacity-50')}`}
                        onClick={handleClosePreview}
                    ></div>

                    {/* Preview Content */}
                    <div className="relative h-full">
                        <Preview
                            config={config}
                            onClose={handleClosePreview}
                            onDownload={handleDownload}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
