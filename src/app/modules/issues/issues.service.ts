import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { IssuesModel } from './issues.model';
import { AddSurveyModel } from 'src/app/models/add-survey.model';
import { AddContentModel } from 'src/app/models/add-content.model';

@Injectable()
export class IssuesService {

    constructor(private http: HttpClient) { }
    
    public getAll(): Observable<IssuesModel[] | undefined> {
        const url = `${environment.server}/issues/list`;

        return this.http.get(url, { params: {} }) as Observable<IssuesModel[]>;
    }

    public add(payload: AddSurveyModel | AddContentModel): Observable<IssuesModel | undefined> {
        const url = `${environment.server}/issues/store`;

        return this.http.post(url, payload, {}) as Observable<IssuesModel>;
    }
}