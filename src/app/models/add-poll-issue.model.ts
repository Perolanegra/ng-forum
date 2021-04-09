export interface AddPollIssueModel {
    issue: {
        content: {
            closingDate?: Date;
            closingTime?: string;
            formArrOpt: string[];
            hasClosingDate: boolean;
            hasMultipleChoice: boolean;
            displayWhoVoted?: boolean;
            question: string;
            title: string;
        };
    
        author: string;
        subtitle: string;
        id_tags: number[];
        title: string[];
        typeSurveyContent: boolean;
    }
}