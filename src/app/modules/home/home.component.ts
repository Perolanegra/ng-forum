import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthActions } from 'src/app/state/auth/auth.actions';
import { NgDefault } from 'src/app/core/ng-default';
import { AppActions } from 'src/app/shared/state/app.actions';
import { AppController } from 'src/app/core/appController';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends NgDefault implements OnInit, OnDestroy {
 
  constructor(
    protected router: Router,
    private store: Store,
    protected route: ActivatedRoute,
    private appController: AppController,
  ) {
    super(route, router);
  }
  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  signOut() {
    this.store.dispatch(new AuthActions.RemoveAccess()).subscribe(() => this.appController.navigate('login'));
  }

}
