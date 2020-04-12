import { Component } from '@angular/core';
import { GlobalVars } from './core/globalVars';
import { UserModel } from './shared/models/user/user.model';
import { AppController } from './core/appController';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private globalVars: GlobalVars, private appController: AppController) {
    this.setRoutesLocalStorage();
  }

  title = 'ng-forum';
   // Implementar um subscription que muda o valor do observable quando o cara loga/desloga,
   // e a partir disso alterar perspectiva no html
  public get isLoggedIn(): Boolean {
    return this.globalVars.isLogged();
  }

  setRoutesLocalStorage(): void {
    const fillerNav: Object = this.appController.fillerNavs();
    localStorage.setItem('fillerNav', JSON.stringify(fillerNav));
  }

}

