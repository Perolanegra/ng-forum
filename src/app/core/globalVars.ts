import { Injectable } from '@angular/core';
import { UserModel } from '../shared/models/user/user.model';

const KEY = 'authToken';
const KEY_REFRESH = 'authRefreshToken';
const KEY_USER_LOGGED_IN = 'userAuthenticated';

@Injectable()
export class GlobalVars {
 
  private user: UserModel;
  private accessToken: string;
  private refreshToken: string;

  constructor() {

  }

  getUserLoggedIn(): UserModel {
    return JSON.parse(localStorage.getItem(KEY_USER_LOGGED_IN));
  }

  setUserLoggedIn(userLogged: UserModel) {
    this.user = new UserModel();
    this.user = userLogged;
    localStorage.setItem(KEY_USER_LOGGED_IN, JSON.stringify(userLogged));
  }

 //Verifica se existe token
  hasAccess(): Boolean {
    return !!this.getAccess();
  }

  getAccess(): Object {
    return this.getUserLoggedIn();
  }

  getRefreshToken(): string {
    return localStorage.getItem(KEY_REFRESH);
  }

  // setAccessToken(str: string) { // será usado futuramente
  //   this.accessToken = str;
  //   return localStorage.setItem(KEY, str);
  // }

  setRefreshToken = (str: string) => {
    this.refreshToken = str;
    return localStorage.setItem(KEY_REFRESH, str);
  }

  //Remove o token, utilizado para efetuar logout
  removeToken() {
    localStorage.removeItem(KEY);
  }

  removeUserLoggedIn() {
    localStorage.removeItem(KEY_USER_LOGGED_IN);
  }

  //Verifica se tem alguém logado
  isLogged(): Boolean {
    return this.hasAccess();
  }

  
}