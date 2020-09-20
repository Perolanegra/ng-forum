export interface AddContextIssueModel {
    issue: {
        content: {
            context: string;
            enableNotifications: boolean;
        };
    
        author: string;
        subtitle: string;
        id_tags: number[];
        title: string[];
        typeSurveyContent: boolean;
    }
}