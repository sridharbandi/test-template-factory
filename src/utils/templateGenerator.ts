import { ProjectConfig } from '../types';
import JSZip from 'jszip';

export async function generateTemplate(config: ProjectConfig): Promise<Buffer> {
    const zip = new JSZip();
    const repoPath = `${config.tool}/${config.language}/${config.buildTool}/${config.runner}`;

    try {
        const response = await fetch(
            `https://api.github.com/repos/your-github-username/test-automation-templates/contents/${repoPath}`,
            {
                headers: {
                    'Accept': 'application/vnd.github+json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const files = await response.json();

        for (const file of files) {
            if (file.type === 'file') {
                const content = await fetch(file.download_url).then(res => res.arrayBuffer());
                zip.file(file.path, content);
            }
        }

        const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
        return zipBuffer;
    } catch (error) {
        console.error('Error generating template:', error);
        throw error;
    }
}