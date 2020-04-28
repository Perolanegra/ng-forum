import { Component, OnInit, OnDestroy, Input, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalVars } from 'src/app/core/globalVars';
import { Store, Actions } from '@ngxs/store';
import { AuthActions } from 'src/app/state/auth/auth.actions';
import { NgDefault } from 'src/app/core/ng-default';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends NgDefault  implements OnInit, OnDestroy {
 
  constructor(
    protected router: Router,
    public globalVars: GlobalVars,
    private store: Store,
    protected route: ActivatedRoute,
    private actions: Actions
  ) {
    super(route, router);
  }
  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  signOut() {
    this.store.dispatch(new AuthActions.Signout()).subscribe(() => this.globalVars.removeUserLoggedIn());
  }

}
