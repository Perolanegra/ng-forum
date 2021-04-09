import { IssueTagModel } from 'src/app/models/issue-tag.model';

export namespace IssueTagActions {
    export class List {
        static readonly type = '[IssueTag] List Issue Tags';
        constructor(public payload: IssueTagModel[]) {}
    }

}