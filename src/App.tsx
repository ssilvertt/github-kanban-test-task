import { Input, Button, rem } from '@mantine/core';
import { useEffect, useState } from 'react';
import { fetchOpenIssues, fetchClosedIssues } from './api/fetchIssues.ts';
import styles from './App.module.css';
import { BreadcrumbsStars } from './components/Breadcrumbs';
import { fetchRepoData } from './api/fetchRepo.ts';
import { IssuesTable } from './components/IssuesTable';
import { useIssuesStore } from './store/issues.ts';

function App() {
    const issues = useIssuesStore((state) => state.issues);
    const closedIssues = useIssuesStore((state) => state.closedIssues);
    const setIssues = useIssuesStore((state) => state.setIssues);
    const setClosedIssues = useIssuesStore((state) => state.setClosedIssues);
    const issuesWithAssignee = useIssuesStore(
        (state) => state.issuesWithAssignee
    );
    const setIssuesWithAssignee = useIssuesStore(
        (state) => state.setIssuesWithAssignee
    );
    const [value, setValue] = useState('');
    const [repoData, setRepoData] = useState<{
        authorName: string;
        authorLink: string;
        repoName: string;
        repoLink: string;
        stars: string;
    } | null>(null);

    const handleClick = async () => {
        try {
            const data = await fetchRepoData(value);
            setRepoData(data);
            const fetchedOpenIssues = await fetchOpenIssues(
                data.authorName,
                data.repoName
            );
            setIssues(fetchedOpenIssues.issues);

            const issuesWthAssignee = fetchedOpenIssues.issues.filter(
                (issue) => {
                    return issue.assignee;
                }
            );
            setIssuesWithAssignee(issuesWthAssignee);

            const fetchedClosedIssues = await fetchClosedIssues(
                data.authorName,
                data.repoName
            );
            setClosedIssues(fetchedClosedIssues.closedIssues);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.container__innerWithInput}>
                <Input
                    placeholder="Enter github repo link"
                    style={{ width: rem('800px') }}
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                />
                <Button
                    style={{ marginLeft: rem('8') }}
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'indigo', deg: 90 }}
                    onClick={handleClick}
                >
                    Load issues
                </Button>
            </div>
            {repoData && <BreadcrumbsStars {...repoData} />}
            <div className={styles.container__withIssues}>
                {issues.length > 0 && (
                    <IssuesTable issues={issues} header={'ToDo'} />
                )}
                {issuesWithAssignee.length > 0 && (
                    <IssuesTable
                        issues={issuesWithAssignee}
                        header={'In Progress'}
                    />
                )}
                {closedIssues.length > 0 && (
                    <IssuesTable issues={closedIssues} header={'Done'} />
                )}
            </div>
        </div>
    );
}

export default App;
