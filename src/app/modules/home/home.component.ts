import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVars } from 'src/app/core/globalVars';
import { Store } from '@ngxs/store';
import { AuthActions } from 'src/app/state/auth/auth.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    public globalVars: GlobalVars,
    private store: Store
  ) {
  }
  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  signOut() {
    this.store.dispatch(new AuthActions.Signout()).subscribe(success => {
      this.globalVars.removeUserLoggedIn();
      this.router.navigate(['login']).catch(error => { // dps tirar daqui e por o guarda de rota
        console.log('erro navegação: ', error);
      });
    }, error => { });
  }


}
