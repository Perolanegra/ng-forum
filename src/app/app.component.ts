import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor() {
    this.setRoutesLocalStorage();
  }

  title = 'ng-forum';
   // Implementar um subscription que muda o valor do observable quando o cara loga/desloga,
   // e a partir disso alterar perspectiva no html
  public isLoggedIn() {
    return true;
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

