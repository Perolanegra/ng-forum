import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthStateModel } from '../state/auth/auth.state';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
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

  authState() {
    return this.afAuth.authState.pipe(map(auth => {
      if (auth) {
        return this.db.collection("users").doc(auth.uid).get()
      } else return of([]);
    }));
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

  sair() {
    this.afAuth.signOut();
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

  googleLogin(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().languageCode = 'pt';
    return this.afAuth.signInWithPopup(provider)
      .then(() => console.log('successful auth'))
      .catch(error => console.log(error));
    // firebase.auth().getRedirectResult().then(function(result) {
    //   if (result.credential) {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     var token = result.credential.accessToken;
    //     // ...
    //   }
    //   // The signed-in user info.
    //   var user = result.user;
    // })

  }

  get hasUsername() {
    return this.currentUser.username ? true : false
  }

  // checkUsername(username: string) {
  //   username = username.toLowerCase()
  //   return this.db.object(`usernames/${username}`)
  // }

  // updateUsername(username: string) {

  //   let data = {}
  //   data[username] = this.currentUser.uid

  //   this.db.object(`/users/${this.currentUser.uid}`).update({ "username": username })
  //   this.db.object(`/usernames`).update(data)
  // }

}
