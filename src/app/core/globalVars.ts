import { Injectable } from '@angular/core';

const KEY_TOKEN = 'auth.token';
@Injectable()
export class GlobalVars {

  constructor() {

  }

  public getToken = () => JSON.parse(localStorage.getItem(KEY_TOKEN));

}