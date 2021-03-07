import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { IssuesModel } from '../../models/issues.model';
import { IssueActions } from './issue.actions';
import { IssuesService } from '../../modules/issues/issues.service';

@State<any>({
    name: 'issue',
    defaults: {
       pagination: 15
    }
})

@Injectable()
export class IssueState {

    constructor(private issueService: IssuesService) { }

    @Selector()
    static pagination(state: any) {
        return state.pagination;
    }

    @Action(IssueActions.Add)
    async add({ getState, setState }: StateContext<any>, { payload }: IssueActions.Add) {
        if (payload) {
            const response: any = await this.issueService.add(payload).toPromise();
            console.log('response: ', response);
            // setState(response);
        }
    }

    @Action(IssueActions.Pagination)
    async list({ getState, setState }: StateContext<any>, { payload }: IssueActions.Pagination) {
        if(payload) {
            const state = getState();
            setState({
                ...state,
                pagination: payload
            });
        }
    }


}