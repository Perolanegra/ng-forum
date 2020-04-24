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
    return JSON.parse(sessionStorage.getItem(KEY_USER_LOGGED_IN));
  }

  setUserLoggedIn(userLogged: UserModel) {
    this.user = new UserModel();
    this.user = userLogged;
    sessionStorage.setItem(KEY_USER_LOGGED_IN, JSON.stringify(userLogged));
  }

 //Verifica se existe token
  hasAccess(): Boolean {
    return !!this.getAccess();
  }

  getAccess(): Object {
    return this.getUserLoggedIn();
  }

  getRefreshToken(): string {
    return sessionStorage.getItem(KEY_REFRESH);
  }

  setStateActiveRoute(actualRoutePath: string, newRoutePath: string) {
    const { routes } = JSON.parse(sessionStorage.getItem('fillerNav'));
    routes.map(val => {
      if(val.path === actualRoutePath) {
        val.isActive = false;
      }
      if(val.path === newRoutePath) {
        val.isActive = true;
      }
    });

    sessionStorage.setItem('fillerNav', JSON.stringify(routes));
  }

  // setAccessToken(str: string) { // será usado futuramente
  //   this.accessToken = str;
  //   return sessionStorage.setItem(KEY, str);
  // }

  setRefreshToken = (str: string) => {
    this.refreshToken = str;
    return sessionStorage.setItem(KEY_REFRESH, str);
  }

  //Remove o token, utilizado para efetuar logout
  removeToken() {
    sessionStorage.removeItem(KEY);
  }

  removeUserLoggedIn() {
    sessionStorage.removeItem(KEY_USER_LOGGED_IN);
  }

  //Verifica se tem alguém logado
  isLogged(): Boolean {
    return this.hasAccess();
  }

  setSessionStorage() {
    
  }
  
  
}