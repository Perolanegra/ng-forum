import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { IssuesModel } from "../../models/issues.model";
import { AddPollIssueModel } from "src/app/models/add-poll-issue.model";
import { AddContextIssueModel } from "src/app/models/add-context-issue.model";
import { Constants } from "src/app/core/pattern/constants";

@Injectable()
export class IssuesService {
  constructor(private http: HttpClient) {}

  public getWithPagination(
    paginate: number
  ): Observable<IssuesModel[] | undefined> {
    const url = `${environment.server}/${Constants.defaultPattern.nestPath.issues.getWithPagination}`;
    const params = new HttpParams().set("paginate", paginate.toString());
    return this.http.get(url, { params: params }) as Observable<IssuesModel[]>;
  }

  public add(
    payload: AddPollIssueModel | AddContextIssueModel
  ): Observable<any | undefined> {
    const url = `${environment.server}/${Constants.defaultPattern.nestPath.issues.store}`;
    return this.http.post(url, { payload }, {});
  }

  public getDetailsById(id: number): Observable<any | undefined> {
    const path = Constants.defaultPattern.nestPath.issues.getDetailsById;
    const url = `${environment.server}/${path}/${id}`;
    return this.http.get(url, { params: {} }) as Observable<any>;
  }

  public getPollDetailById(id: number): Observable<any | undefined> {
    const path = Constants.defaultPattern.nestPath.issues.getPollDetailById;
    const url = `${environment.server}/${path}/${id}`;
    return this.http.get(url, { params: {} }) as Observable<any>;
  }
}
