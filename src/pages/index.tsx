import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import RadioGroup from '../components/RadioGroup';
import { ProjectConfig } from '../types';
import { AUTOMATION_TOOLS, PROGRAMMING_LANGUAGES, BUILD_TOOLS, RUNNERS } from '../utils/constants';
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
        }
    }, []);

    const handleConfigChange = (key: keyof ProjectConfig) => (value: string) => {
        setConfig(prevConfig => {
            const newConfig = { ...prevConfig, [key]: value };

            if (key === 'tool') {
                if (value === 'selenium' || value === 'playwright') {
                    newConfig.language = 'java';
                    newConfig.buildTool = 'maven';
                    newConfig.runner = 'junit';
                } else if (value === 'cypress' || value === 'testcafe') {
                    newConfig.language = 'javascript';
                    newConfig.buildTool = 'npm';
                    newConfig.runner = value === 'cypress' ? 'cypress-mocha' : 'testcafe';
                }
            }

            if ((newConfig.tool === 'selenium' || newConfig.tool === 'playwright') && key === 'language') {
                if (value === 'javascript' || value === 'typescript') {
                    newConfig.buildTool = 'npm';
                    newConfig.runner = 'mocha';
                } else if (value === 'python') {
                    newConfig.buildTool = 'pip';
                    newConfig.runner = 'pytest';
                } else {
                    newConfig.buildTool = 'maven';
                    newConfig.runner = 'junit';
                }
            }

            localStorage.setItem('projectConfig', JSON.stringify(newConfig));
            return newConfig;
        });
    };

    const getLanguageOptions = () => {
        if (config.tool === 'selenium' || config.tool === 'playwright') {
            return ['java', 'javascript', 'typescript', 'python', 'csharp'];
        } else if (config.tool === 'cypress' || config.tool === 'testcafe') {
            return ['javascript', 'typescript'];
        }
        return PROGRAMMING_LANGUAGES;
    };

    const getBuildToolOptions = () => {
        if (config.tool === 'selenium' || config.tool === 'playwright') {
            if (config.language === 'javascript' || config.language === 'typescript') {
                return ['npm', 'yarn'];
            } else if (config.language === 'python') {
                return ['pip'];
            }
            return ['maven', 'gradle'];
        } else if (config.tool === 'cypress' || config.tool === 'testcafe') {
            return ['npm', 'yarn'];
        }
        return BUILD_TOOLS;
    };

    const getRunnerOptions = () => {
        if (config.tool === 'selenium' || config.tool === 'playwright') {
            if (config.language === 'javascript' || config.language === 'typescript') {
                return ['mocha', 'jasmine', 'cucumber'];
            } else if (config.language === 'python') {
                return ['pytest', 'unittest', 'behave'];
            }
            return ['junit', 'testng', 'junit-cucumber', 'testng-cucumber'];
        } else if (config.tool === 'cypress') {
            return ['cypress-mocha', 'cypress-cucumber'];
        } else if (config.tool === 'testcafe') {
            return ['testcafe', 'cucumber'];
        }
        return RUNNERS;
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
                            options={AUTOMATION_TOOLS}
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
