import { NextApiRequest, NextApiResponse } from 'next';
import { generateTemplate } from '../../utils/templateGenerator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const config = req.body;
            const zipBuffer = await generateTemplate(config);

            res.setHeader('Content-Type', 'application/zip');
            res.setHeader('Content-Disposition', 'attachment; filename=test-automation-template.zip');
            res.send(zipBuffer);
        } catch (error) {
            console.error('Error generating template:', error);
            res.status(500).json({ error: 'Failed to generate template' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
