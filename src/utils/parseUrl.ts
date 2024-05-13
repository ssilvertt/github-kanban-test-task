import { type RepoInfo } from '../types/repo.ts';

export function parseURL(url: string): RepoInfo {
    const parts = url.split('/').reverse();

    return {
        owner: parts[1] || 'OWNER',
        repo: parts[0] || 'REPO',
    };
}
