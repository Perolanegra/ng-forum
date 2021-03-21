import { State, Selector, Action, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { IssuesModel } from "../../models/issues.model";
import { IssueActions } from "./issue.actions";
import { IssuesService } from "../../modules/issues/issues.service";

@State<any>({
  name: "issue",
  defaults: {
    issueCreated: null,
  },
})
@Injectable()
export class IssueState {
  constructor(private issueService: IssuesService) {}

  @Action(IssueActions.Add)
  async add(
    { getState, setState }: StateContext<any>,
    { payload }: IssueActions.Add
  ) {
    if (payload) {
      const response: any = await this.issueService.add(payload).toPromise();
      setState({ issueCreated: response });
    }
  }
}
