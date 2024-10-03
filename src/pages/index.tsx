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
            <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
                <Head>
                    <title>Test Automation Template Generator</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className="flex-grow container mx-auto px-4 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold">Test Automation Template Generator</h1>
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-600'}`}
                        >
                            {theme === 'dark' ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <RadioGroup
                            label="Automation Tool"
                            options={AUTOMATION_TOOLS}
                            selectedOption={config.tool}
                            onChange={handleConfigChange('tool')}
                        />
                        <RadioGroup
                            label="Programming Language"
                            options={getLanguageOptions()}
                            selectedOption={config.language}
                            onChange={handleConfigChange('language')}
                        />
                        <RadioGroup
                            label="Build Tool"
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
                    <Preview
                        config={config}
                        onClose={() => setShowPreview(false)}
                        onDownload={handleDownload}
                    />
                )}
            </div>
    );
};

export default Home;