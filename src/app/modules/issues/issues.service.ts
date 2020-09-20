import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IssuesModel } from './issues.model';
import { AddPollIssueModel } from 'src/app/models/add-poll-issue.model';
import { AddContextIssueModel } from 'src/app/models/add-context-issue.model';

@Injectable()
export class IssuesService {

    constructor(private http: HttpClient) { }
    
    public getAll(): Observable<IssuesModel[] | undefined> {
        const url = `${environment.server}/issues/list`;
        return this.http.get(url, { params: {} }) as Observable<IssuesModel[]>;
    }

    public add(payload: AddPollIssueModel | AddContextIssueModel): Observable<any | undefined> {
        const url = `${environment.server}/issues/store`;
        return this.http.post(url, { payload }, {});
    }
}