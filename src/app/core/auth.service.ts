import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthStateModel } from '../state/auth/auth.state';
import { environment } from 'src/environments/environment';
import { switchMap, map } from 'rxjs/operators';


export class User {

  uid: string;
  username: string = "";

  constructor(auth) {
    this.uid = auth.uid
  }

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;

  constructor(
    private http: HttpClient,
  ) {
    
  }


  signout(): Observable<null> {
    return of(null);
  }

  signUp(username, email, password) {

  }

  getAccessToken(username: string, password: string) { // consigo esse kra no objeto do firebase
    const url = `http://localhost:3000/auth/login`;

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      username: username,
      password: password
    };

    return this.http.post(url, body, { headers });
  }

  getUserByToken(token): Observable<any> {
    const url = `http://localhost:3000/user`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(url, { headers });
  }


}
