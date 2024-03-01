import { Progress, Table, TableColumn } from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { useAsync } from 'react-use';
import { GitlabCIApiRef } from '../../../api';
import {
    gitlabInstance,
    gitlabProjectId,
    gitlabProjectSlug,
} from '../../gitlabAppData';
import { getElapsedTime } from '../../utils';
import { TagCommit, TagTitle, TagMessage, TagAuthor, TagCommitDate } from './columns';
import type { TagSchema } from '@gitbeaker/rest';

export const DenseTable = ({
    issuesObjects,
    projectName,
}: {
    issuesObjects: TagSchema[];
    projectName: string | undefined;
}) => {
    const columns: TableColumn<TagSchema>[] = [
        { title: 'Tag', field: 'name' },
        { title: 'Commit', render: TagCommit },
        { title: 'Title', render: TagTitle },
        { title: 'Message', render: TagMessage },
        { title: 'Author', render: TagAuthor },
        { title: 'Commit Date', render: TagCommitDate },
    ];

    const title = 'Gitlab Issues: ' + projectName;
    
    const data = issuesObjects.map((issue) => ({
        ...issue,
        created_at: getElapsedTime(issue.authored_date),
    }));
    
    return (
        <Table
            title={title}
            options={{ search: true, paging: true }}
            columns={columns}
            data={data}
        />
    );
};

export const IssuesTable = ({}) => {
    const project_id = gitlabProjectId();
    const project_slug = gitlabProjectSlug();
    const gitlab_instance = gitlabInstance();

    const GitlabCIAPI = useApi(GitlabCIApiRef).build(
        gitlab_instance || 'gitlab.com'
    );

    const { value, loading, error } = useAsync(async (): Promise<{
        data: TagSchema[];
        projectName: string;
    }> => {
        const projectDetails = await GitlabCIAPI.getProjectDetails(
            project_slug || project_id
        );
        if (!projectDetails)
            throw new Error('wrong project_slug or project_id');

        const tags = await GitlabCIAPI.getTags(projectDetails.id);

        if (!tags) {
            throw new Error('gitlab tags is undefined!');
        }
        const renderData = {
            data: tags,
            projectName: projectDetails.name,
        };

        return renderData;
    }, []);

    if (loading) {
        return <Progress />;
    } else if (error) {
        return <Alert severity="error">{error.message}</Alert>;
    }

    return (
        <DenseTable
            issuesObjects={value?.data || []}
            projectName={value?.projectName}
        />
    );
};
