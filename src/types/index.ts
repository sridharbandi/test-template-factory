export type AutomationTool = 'selenium' | 'playwright' | 'cypress' | 'testcafe';
export type ProgrammingLanguage = 'java' | 'javascript' | 'typescript' | 'python' | 'csharp';
export type BuildTool = 'maven' | 'gradle' | 'npm' | 'yarn';
export type Runner = 'junit' | 'testng' | 'junit-cucumber' | 'testng-cucumber' | 'mocha' | 'jasmine' | 'cucumber';

export interface ProjectConfig {
    tool: AutomationTool;
    language: ProgrammingLanguage;
    buildTool: BuildTool;
    runner: Runner;
}
