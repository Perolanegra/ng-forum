import { Component } from '@angular/core';
import { GlobalVars } from './core/globalVars';
import { AppController } from './core/appController';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private globalVars: GlobalVars, 
    private appController: AppController,
    ) {
    this.setRoutesLocalStorage();
  }

  title = 'ng-forum';
  
  public get isLoggedIn(): Boolean { // remover esse kra daqui pq o html fica testando ele
    return this.globalVars.isLogged();
  }

  setRoutesLocalStorage(): void {
    this.appController.fillerNavs().then(filer => {
      this.appController.setRoutesNav(filer);
    })
  }

}

