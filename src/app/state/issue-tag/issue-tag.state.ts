import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { IssueTagModel } from '../../models/issue-tag.model';
import { IssueTagActions } from './issue-tag.actions';
import { IssueTagService } from 'src/app/shared/services/issue-tag.service';

@State<IssueTagModel>({
    name: 'issueTag',
    defaults: {
        id: null,
        value: null,
    }
})

@Injectable()
export class IssueTagState {

    constructor(private issueTagService: IssueTagService) { }

    @Selector()
    static tags(state: IssueTagModel): IssueTagModel {
        return state;
    }

    @Action(IssueTagActions.List)
    async getTags({ getState, setState }: StateContext<IssueTagModel>, { }: IssueTagActions.List) {
        const response: any = await this.issueTagService.list().toPromise();
        setState(response);
    }

}