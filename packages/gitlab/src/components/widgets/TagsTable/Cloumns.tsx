import {
    Avatar,
    StatusAborted,
    StatusOK,
    StatusPending,
    TableColumn,
} from '@backstage/core-components';
import { Box, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import React from 'react';
import type { TagSchema } from '@gitbeaker/rest';

export const TagCommit = (
    issueObject: TagSchema
): TableColumn<Record<string, unknown>> => {
    return (
        <Typography variant="body2" noWrap>
            <Box ml={1} component="span">
                <Link href={issueObject.commit} target="_blank">
                    {issueObject.commit.short_id}
                </Link>
            </Box>
        </Typography>
    );
};

export function TagTitle(
    issueObject: TagSchema
): TableColumn<Record<string, unknown>> {
    return (
        <Typography variant="body2" noWrap>
            <Box ml={1} component="span">
                <Link href={issueObject.commit.title} target="_blank">
                    {issueObject.commit.title}
                </Link>
            </Box>
        </Typography>
    );
}

export function TagMessage (
    issueObject: TagSchema
): TableColumn<Record<string, unknown>> {
    return (
            <Typography variant="body2" noWrap>
                <Box ml={1} component="span">
                    <Link href={issueObject.commit.message} target="_blank">
                        {issueObject.commit.message}
                    </Link>
                </Box>
            </Typography>
    );
}

export function TagAuthor  (
    issueObject: TagSchema
): TableColumn<Record<string, unknown>> {
    return (
            <Typography variant="body2" noWrap>
                <Box ml={1} component="span">
                    <Link href={issueObject.commit.author_name} target="_blank">
                        {issueObject.commit.author_name}
                    </Link>
                </Box>
            </Typography>
    );
}

export function TagCommitDate   (
    issueObject: TagSchema
): TableColumn<Record<string, unknown>> {
    return (
            <Typography variant="body2" noWrap>
                <Box ml={1} component="span">
                    <Link href={issueObject.commit.committed_date} target="_blank">
                        {issueObject.commit.committed_date}
                    </Link>
                </Box>
            </Typography>
    );
}
