import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthStateModel } from '../state/auth/auth.state';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
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
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
  ) {
    
  }


  signIn(username: string, password: string): Observable<AuthStateModel> {

    return of({
      token: 'string',
      refreshToken: 'string',
      user: {
        id_nivel: 13,
        username: 'devBaiano',
        name: 'Igor',
        lastName: 'Alves',
        statusMsg: 'she wanna hang wit the starboy',
        ddd: '071',
        phone: '993337275',
        email: 'igoralves@devbaiano.com.br',
        password: 'string',
        photoURL: 'string',
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

  signUp(username, email, password) {

  }

  getAccessToken(REFRESH_TOKEN: string) { // consigo esse kra no objeto do firebase
    const url = `https://securetoken.googleapis.com/v1/token?key=${environment.firebaseConfig.apiKey}`;

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(url, `grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}`, { headers });

    // {
    //   "access_token": string,
    //   "expires_in": string, 	Expiration time of access_token in seconds.
    //   "token_type": string, The type of access_token. Included to conform with the OAuth 2.0 specification; always Bearer.
    //   "refresh_token": string,
    // }
  }


}
