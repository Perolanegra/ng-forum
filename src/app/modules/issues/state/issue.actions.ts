import { AddSurveyModel } from '../../../models/add-survey.model';
import { AddContentModel } from '../../../models/add-content.model';

export namespace IssueActions {

    export class Add {
        static readonly type = '[Issue] Add Issue';
        constructor(public payload: AddSurveyModel | AddContentModel) { }
    }

    export class List {
        static readonly type = '[Issue] List Issue';
        constructor(public payload: any) { }
    }

}