import { Endpoints } from '@octokit/types';

export type Issues =
    Endpoints['GET /repos/{owner}/{repo}/issues']['response']['data'];
