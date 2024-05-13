import { create } from 'zustand';
import type { Issues } from '../types/issues.ts';

interface IssuesStorage {
    issues: Issues;
    issuesWithAssignee: Issues;
    closedIssues: Issues;
    setIssues: (issues: Issues) => void;
    setClosedIssues: (issues: Issues) => void;
    setIssuesWithAssignee: (issues: Issues) => void;
}

export const useIssuesStore = create<IssuesStorage>()((set) => ({
    issues: [],
    closedIssues: [],
    issuesWithAssignee: [],
    setIssues: (issues: Issues) => set(() => ({ issues })),
    setClosedIssues: (closedIssues: Issues) => set(() => ({ closedIssues })),
    setIssuesWithAssignee: (issuesWithAssignee: Issues) => set(() => ({ issuesWithAssignee })),
}));
