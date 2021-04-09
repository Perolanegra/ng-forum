import { Injectable } from "@angular/core";
import { DefaultResolver } from "../../../core/default.resolver";
import { IssuesService } from "../issues.service";
import { Observable } from "rxjs";
import { IssuesModel } from "src/app/models/issues.model";
import { AppController } from "src/app/core/appController";

@Injectable()
export class ListIssuesResolver extends DefaultResolver {
  constructor(
    private service: IssuesService,
    private appController: AppController
  ) {
    super();
    // this.appController.showSpinner();
  }

  resolver(params: any): Observable<IssuesModel[] | undefined> {
    return this.service.getWithPagination(params.pagination);
  }
}
