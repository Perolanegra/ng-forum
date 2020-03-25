import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVars } from './core/globalVars';
import { UserModel } from './shared/models/user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
    private globalVars: GlobalVars) {
    this.setRoutesLocalStorage();
  }

  ngOnInit() {
  }

  title = 'ng-forum';
   // Implementar um subscription que muda o valor do observable quando o cara loga/desloga,
   // e a partir disso alterar perspectiva no html
  public isLoggedIn() {
    return this.globalVars.isLogged();
  }

  setRoutesLocalStorage() {
    const fillerNav: Object = {
      routes: [
        { name: 'Início', isActive: true, path: 'home' },
        { name: 'Perfil', isActive: false, path: 'profile' },
        { name: 'Meus Posts', isActive: false, path: 'my-stuff' },
      ]
    };

    localStorage.setItem('fillerNav', JSON.stringify(fillerNav));
  }

}

