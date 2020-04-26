import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthStateModel } from './state/auth/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(username: string, password: string): Observable<AuthStateModel> {

    // let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    //     .set('authorization', 'Basic ' + btoa(this.clientId + ':' + this.clientSecret));
    // return this.http.post(this.server + 'oauth/token', 'grant_type=password&username=' + pLogin + '&password=' + pSenha, { headers });
    return of({
      token: 'string',
      refreshToken: 'string',
      user: {
        id_nivel: 13,
        username: 'devBaiano',
        name: 'Igor',
        lastName: 'Alves',
        statusMsg: 'she wanna hang wit the starboy',
        phone: '993337275',
        email: 'igoralves@devbaiano.com.br',
        password: 'string',
        img: 'string',
        birthDate: new Date(),
        created_at: new Date(),
        deleted_at: new Date(),
        updated_at: new Date()
      }
    });
  }

  signout(): Observable<null> {
    return of(null);
  }

}
