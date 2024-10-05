import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RadioGroup from '../components/RadioGroup';
import { AutomationTool, ProgrammingLanguage, BuildTool, Runner, ProjectConfig } from '../types';
import { AUTOMATION_TOOLS, PROGRAMMING_LANGUAGES, BUILD_TOOLS, RUNNERS } from '../utils/constants';
import Preview from '../components/Preview';
import { useTheme } from '../components/ThemeProvider';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import Logo from '../assets/logo.svg';
import Image from 'next/image';
import SideBar from '../components/SideBar';

const Home: React.FC = () => {
    const [config, setConfig] = useState<ProjectConfig>({
        tool: 'selenium',
        language: 'java',
        buildTool: 'maven',
        runner: 'junit',
    });
    const { theme, toggleTheme } = useTheme();
    const [showPreview, setShowPreview] = useState(false);

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

    const handleGenerate = async () => {
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(config),
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'test-automation-template.zip';
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                console.error('Failed to generate template');
            }
        } catch (error) {
            console.error('Error generating template:', error);
        }
    };

    const handlePreview = () => {
        setShowPreview(true);
    };

    const handleDownload = () => {
        handleGenerate();
    };

    return (
        <div className={`flex ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
            <SideBar toggleTheme={toggleTheme} />
            <div className="flex-1 min-h-screen sm:ml-16 pb-20">
                <Head>
                    <title>Test Template Factory</title>
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                </Head>

                <main className="flex-grow container mx-auto px-4 py-8">
                    <div className={`flex justify-between items-center mb-8 pb-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                        <div className="flex items-center">
                            <Image src={Logo} alt="Logo" width={48} height={48} className="mr-4" />
                            <div>
                                <h1 className="text-4xl font-bold">
                                    <span className="hidden sm:inline">
                                        <span className={`${theme === 'dark' ? 'text-violet-400' : 'text-violet-600'}`}>T</span>est{' '}
                                        <span className={`${theme === 'dark' ? 'text-violet-400' : 'text-violet-600'}`}>T</span>emplate{' '}
                                        <span className={`${theme === 'dark' ? 'text-violet-400' : 'text-violet-600'}`}>F</span>actory
                                    </span>
                                    <span className="sm:hidden">
                                        <span className={`${theme === 'dark' ? 'text-violet-400' : 'text-violet-600'}`}>TTF</span>
                                    </span>
                                </h1>
                                <p className={`text-sm italic mt-2 ${theme === 'dark' ? 'text-violet-400' : 'text-violet-600'} hidden sm:block`}>
                                    Kickstart automation frameworks in just a few clicks
                                </p>
                            </div>
                        </div>
                    </div>

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

                <Footer onGenerate={handleGenerate} onPreview={handlePreview} />

                {showPreview && (
                    <div className={`preview-slide ${showPreview ? 'show' : ''} fixed inset-0 z-30 sm:ml-16 overflow-hidden`}>
                        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowPreview(false)}></div>
                        <div className="absolute inset-x-0 bottom-0 h-full">
                            <Preview
                                config={config}
                                onClose={() => setShowPreview(false)}
                                onDownload={handleDownload}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;