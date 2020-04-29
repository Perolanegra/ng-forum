import { Component } from '@angular/core';
import { GlobalVars } from './core/globalVars';
import { AppController } from './core/appController';
import { AuthState } from './state/auth/auth.state';
import { Select, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserModel } from './models/user.model';
import { AuthActions } from './state/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  @Select(AuthState.token) token$: Observable<string>;

  constructor(private globalVars: GlobalVars, 
    private appController: AppController,
    private actions: Actions,
    private store: Store
    ) {
    this.setRoutesLocalStorage();
    localStorage.setItem('hasMobileMatches', JSON.stringify(false));
  }

  ngOnInit() {
    this.actions.pipe(ofActionDispatched(AuthActions.Signout)).subscribe(() => this.appController.navigate('login'));
  }

  title = 'ng-forum';
  
  setRoutesLocalStorage(): void {
    this.appController.fillerNavs().then(filer => {
      this.appController.setRoutesNav(filer);
    })
  }

}

