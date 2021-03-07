import { AddPollIssueModel } from 'src/app/models/add-poll-issue.model';
import { AddContextIssueModel } from 'src/app/models/add-context-issue.model';

export namespace IssueActions {

    export class Add {
        static readonly type = '[Issue] Add Issue';
        constructor(public payload: AddPollIssueModel | AddContextIssueModel) { }
    }

    export class Pagination {
        static readonly type = '[Issue] Pagination';
        constructor(public payload: number) { }
    }

}