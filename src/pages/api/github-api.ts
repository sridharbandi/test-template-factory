import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { action, tool, language, build, runner, url } = req.query;

  if (!action) {
    return res.status(400).json({ error: 'Missing required parameter: action' });
  }

  try {
    if (action === 'tree') {
      if (!tool || !language || !build || !runner) {
        return res.status(400).json({ error: 'Missing required parameters for tree action' });
      }

      const response = await fetch(
        `https://api.github.com/repos/sridharbandi/Selenium-Serenity-Junit-Template/git/trees/master?recursive=true`,
        {
          headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch GitHub tree');
      }

      const data = await response.json();
      res.status(200).json(data);
    } else if (action === 'content') {
      if (!url) {
        return res.status(400).json({ error: 'Missing required parameter: url for content action' });
      }

      const response = await fetch(url as string, {
        headers: {
          'Accept': 'application/vnd.github.v3.raw',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch file content');
      }

      const content = await response.text();
      res.status(200).json({ content });
    } else {
      res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GitHub data' });
  }
}
