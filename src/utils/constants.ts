import { AutomationTool, ProgrammingLanguage, BuildTool, Runner } from '../types';

export const AUTOMATION_TOOLS: AutomationTool[] = ['selenium', 'playwright', 'cypress', 'testcafe'];
export const PROGRAMMING_LANGUAGES: ProgrammingLanguage[] = ['java', 'javascript', 'typescript', 'python', 'csharp'];
export const BUILD_TOOLS: BuildTool[] = ['maven', 'gradle', 'npm', 'yarn'];
export const RUNNERS: Runner[] = ['junit', 'testng', 'junit-cucumber', 'testng-cucumber', 'mocha', 'jasmine', 'cucumber'];
