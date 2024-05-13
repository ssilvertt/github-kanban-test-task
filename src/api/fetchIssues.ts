import { Octokit } from '@octokit/rest';
import type { Issues } from '../types/issues.ts';

export const fetchOpenIssues = async (authorName: string, repoName: string) => {
    try {
        const octokit = new Octokit({
            auth: import.meta.env.VITE_TOKEN,
        });
        const openIssues = await octokit.request(
            'GET /repos/{owner}/{repo}/issues',
            {
                owner: authorName,
                repo: repoName,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            }
        );

        const issues: Issues = openIssues.data;

        return { issues };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const fetchClosedIssues = async (authorName: string, repoName: string) => {
    try {
        const octokit = new Octokit({
            auth: import.meta.env.VITE_TOKEN,
        });
        const response = await octokit.request(
            'GET /repos/{owner}/{repo}/issues?state=closed',
            {
                owner: authorName,
                repo: repoName,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            }
        );
        
        const closedIssues: Issues = response.data;
        
        return { closedIssues };
    } catch (error) {
        console.log(error);
        throw error;
    }
};
