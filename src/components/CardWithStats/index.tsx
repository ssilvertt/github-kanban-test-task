import { Card, Image, Text, Group, Button } from '@mantine/core';
import classes from './CardWithStats.module.css';
import { format } from '@formkit/tempo';
import { GoLinkExternal } from 'react-icons/go';
interface CardWithStatsProps {
    avatar_url?: string;
    title: string;
    state: string;
    created_at: string;
    login?: string;
    repo_url: string;
}

export function CardWithStats({
    avatar_url,
    title,
    state,
    created_at,
    login,
    repo_url,
}: CardWithStatsProps) {
    const trueDate = format(created_at, 'full', 'en');

    return (
        <Card withBorder padding="lg" className={classes.card}>
            <Card.Section>
                {avatar_url && (
                    <Image src={avatar_url} alt={login} height={100} />
                )}
            </Card.Section>

            <Group justify="space-between" mt="lg">
                <Text fz="sm" fw={400} className={classes.title}>
                    {title}
                </Text>
                <Group gap={5}>
                    <Text fz="xs" c="dimmed">
                        {state}
                    </Text>
                </Group>
            </Group>
            <Card.Section className={classes.footer}>
                <Text fz="sm" fw={400} className={classes.title}>
                    Opened at: {trueDate}
                </Text>
                <br />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text fz="sm" fw={200} className={classes.title}>
                        Issue author: {login}
                    </Text>
                    <Button
                        size="xs"
                        component="a"
                        href={repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GoLinkExternal />
                    </Button>
                </div>
            </Card.Section>
        </Card>
    );
}
