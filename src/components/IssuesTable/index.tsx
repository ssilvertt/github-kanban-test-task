import { Text } from '@mantine/core';
import type { Issues } from '../../types/issues.ts';
import styles from './IssuesTable.module.css';
import { CardWithStats } from '../CardWithStats';

interface IssuesTableProps {
    issues: Issues;
    header: string;
}

export function IssuesTable({ issues, header }: IssuesTableProps) {
    return (
        <div>
            <Text size="xl" ta="center">
                {header}
            </Text>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div className={styles.container__issues}>
                    {issues.map((issue) => (
                        <CardWithStats
                            avatar_url={issue.user?.avatar_url}
                            state={issue.state}
                            created_at={issue.created_at}
                            login={issue.user?.login}
                            title={issue.title}
                            key={issue.id}
                            repo_url={issue.html_url}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
