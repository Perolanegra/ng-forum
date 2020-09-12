export interface AddSurveyModel {
    contentIssue: {
        closingDate?: Date;
        closingTime?: string;
        formArrOpt: string[];
        hasClosingDate: boolean;
        hasMultipleChoice: boolean;
        hasWhoVoted?: boolean;
        question: string;
        title: string;
    };
    
    subtitle: string;
    tags: string[];
    title: string[];
    typeSurveyContent: boolean;
}