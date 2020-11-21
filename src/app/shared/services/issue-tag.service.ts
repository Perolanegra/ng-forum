import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IssueTagService {

  constructor(private http: HttpClient) { }


  public list(): Observable<any | undefined> {
    const url = `${environment.server}/tags/list`;
    return this.http.get(url, { params: {} });
  }

}
