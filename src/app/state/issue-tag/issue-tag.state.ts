import { State, Action, StateContext, Selector } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { IssueTagModel } from "../../models/issue-tag.model";
import { IssueTagActions } from "./issue-tag.actions";
import { IssueTagService } from "src/app/shared/services/issue-tag.service";

@State<IssueTagModel[]>({
  name: "issue_tags",
  defaults: [
    {
      id: null,
      value: null,
      color: null,
    },
  ],
})
@Injectable()
export class IssueTagState {
  constructor() {}

  @Selector()
  static tags(state: IssueTagModel[]): IssueTagModel[] {
    return state;
  }

  @Action(IssueTagActions.List)
  async getTags(
    { patchState }: StateContext<IssueTagModel[]>,
    { payload }: IssueTagActions.List
  ) {
    patchState(payload);
  }
}
