import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }


  signUp(payload: any): Observable<any> {
    const url = `${environment.prefix}/auth/sign-up`;
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(url, { payload }, {});
  }

  getAccessToken(username: string, password: string): Observable<any> { // por o token no headers em toda request
    const url = `${environment.prefix}/auth/login`;

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const body = {
      username: username,
      password: password
    };

    return this.http.post(url, body, { headers });
  }

  getUserByToken(token: string): Observable<any> {
    const url = `${environment.prefix}/userByToken`;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(url, { headers });
  }

  setForgotPass(payload: string): Observable<any> {
    const url = `${environment.prefix}/auth/forgot-pass`;
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(url, { payload }, {});
  }

  resetPass(payload: string): Observable<any> {
    const url = `${environment.prefix}/auth/reset-pass`;
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(url, { payload }, {});
  }

  public isAuthenticated(token): boolean {
    return !this.jwtHelper.isTokenExpired(token);
  }

}
