import { Anchor, Breadcrumbs, rem } from '@mantine/core';
import { FaStar } from 'react-icons/fa';
import styles from './Breadcrumbs.module.css';

interface BreadcrumbsStarsProps {
    authorName: string;
    authorLink: string;
    repoName: string;
    repoLink: string;
    stars: string;
}

export function BreadcrumbsStars({
    authorName,
    authorLink,
    repoName,
    repoLink,
    stars,
}: BreadcrumbsStarsProps) {
    return (
        <div className={styles.breadcrumbs__container}>
            <Breadcrumbs>
                <Anchor href={authorLink} key={0}>
                    {authorName}
                </Anchor>
                <Anchor href={repoLink} key={1}>
                    {repoName}
                </Anchor>
            </Breadcrumbs>
            <FaStar
                color="orange"
                style={{
                    marginLeft: rem('16'),
                    marginTop: 'auto',
                    marginBottom: 'auto',
                }}
            />
            <div>{stars}</div>
        </div>
    );
}
