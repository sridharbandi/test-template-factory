export type AutomationTool = 'selenium' | 'playwright' | 'cypress' | 'testcafe';
export type ProgrammingLanguage = 'java' | 'javascript' | 'typescript' | 'python' | 'csharp';
export type BuildTool = 'maven' | 'gradle' | 'npm' | 'yarn';
export type Runner = 'junit' | 'testng' | 'junit-cucumber' | 'testng-cucumber' | 'mocha' | 'jasmine' | 'cucumber';

export interface ProjectConfig {
    tool: string;
    language: string;
    buildTool: string;
    runner: string;
}

export interface TreeItem {
    path: string;
    type: string;
    url: string;
    children?: TreeItem[];
}

export interface PreviewProps {
    config: ProjectConfig;
    onClose: () => void;
    onDownload: () => void;
}