import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { IssuesModel } from './issues.model';

@Injectable()
export class IssuesService {

    constructor(private http: HttpClient) { }
    
    public getAll(): Observable<IssuesModel[] | undefined> {
        const url = `${environment.server}/issues/list`;

        return this.http.get(url, { params: {} }) as Observable<IssuesModel[]>;
    }
}