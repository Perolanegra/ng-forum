import { Component, OnInit } from '@angular/core';
import { GlobalVars } from './core/globalVars';
import { UserModel } from './shared/models/user/user.model';
import { FillerNav } from './core/fillerNav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private globalVars: GlobalVars) {
    this.setRoutesLocalStorage();
  }

  ngOnInit() {
  }

  title = 'ng-forum';
   // Implementar um subscription que muda o valor do observable quando o cara loga/desloga,
   // e a partir disso alterar perspectiva no html
  public get isLoggedIn(): Boolean {
    return this.globalVars.isLogged();
  }

  setRoutesLocalStorage() {
    const fillerNav: FillerNav = new FillerNav();
    localStorage.setItem('fillerNav', JSON.stringify(fillerNav));
  }

}

