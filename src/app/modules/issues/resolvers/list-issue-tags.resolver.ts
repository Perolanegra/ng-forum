import { Injectable } from "@angular/core";
import { DefaultResolver } from "../../../core/default.resolver";
import { Observable } from "rxjs";
import { IssueTagService } from 'src/app/shared/services/issue-tag.service';
import { IssueTagModel } from 'src/app/models/issue-tag.model';

@Injectable()
export class ListIssueTagsResolver extends DefaultResolver {
  constructor(
    private service: IssueTagService,
    // private appController: AppController
  ) {
    super();
  }

  resolver(params: any): Observable<IssueTagModel[] | undefined> {
    return this.service.list();
  }
}


