export interface AddContentModel {
    contentIssue: {
        content: string;
        enableNotifications: boolean;
    };

    subtitle: string;
    tags: string[];
    title: string;
    typeSurveyContent: boolean;
}