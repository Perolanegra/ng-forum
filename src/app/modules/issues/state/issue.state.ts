import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { IssuesModel } from '../issues.model';
import { IssueActions } from './issue.actions';
import { IssuesService } from '../issues.service';

@State<IssuesModel>({
    name: 'issue',
    // defaults: {
       
    // }
})

@Injectable()
export class IssueState {

    constructor(private issueService: IssuesService) { }

    @Selector()
    static issue(state: IssuesModel) {
        return state;
    }

    @Action(IssueActions.Add)
    async add({ getState, setState }: StateContext<IssuesModel>, { payload }: IssueActions.Add) {
        if (payload) {
            const response: any = await this.issueService.add(payload).toPromise();
            // const state = getState();
            setState(response);
        }
    }


}