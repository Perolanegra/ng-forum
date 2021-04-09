import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IssueTagModel } from 'src/app/models/issue-tag.model';


@Injectable({
  providedIn: 'root'
})
export class IssueTagService {

  constructor(private http: HttpClient) { }

  public list(): Observable<IssueTagModel[] | undefined> {
    const url = `${environment.server}/tags/list`;
    return this.http.get(url, { params: {} }) as Observable<IssueTagModel[]>;
  }

}
