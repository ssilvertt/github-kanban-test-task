import { Octokit } from '@octokit/rest';
import { parseURL } from '../utils/parseUrl.ts';
import { formatNumber } from '../utils/formatNumber';

interface RepoData {
    authorName: string;
    authorLink: string;
    repoName: string;
    repoLink: string;
    stars: string;
}

export const fetchRepoData = async (repoUrl: string): Promise<RepoData> => {
    try {
        const octokit = new Octokit({
            auth: import.meta.env.VITE_TOKEN,
        });
        const { owner, repo } = parseURL(repoUrl);
        const response = await octokit.request('GET /repos/{owner}/{repo}', {
            owner: owner,
            repo: repo,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });

        const authorName = owner;
        const authorLink = response.data.owner.html_url;
        const repoName = repo;
        const repoLink = repoUrl;
        const stars = formatNumber(response.data.stargazers_count);

        return { authorName, authorLink, repoName, repoLink, stars };
    } catch (error) {
        console.log(error);
        throw error;
    }
};
