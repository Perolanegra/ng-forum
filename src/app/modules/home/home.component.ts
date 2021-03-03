import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthActions } from 'src/app/state/auth/auth.actions';
import { AppActions } from 'src/app/state/app/app.actions';
import { NgDefault } from 'src/app/core/pattern/ng-default';
import { AppController } from 'src/app/core/appController';

@Component({
  selector: 'ng-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends NgDefault implements OnInit {
 
  constructor(
    protected router: Router,
    private store: Store,
    protected route: ActivatedRoute,
    protected appController: AppController,
  ) {
    super(appController);

  }

  ngOnInit(): void {
  }

  signOut() {
    this.store.dispatch(new AuthActions.RemoveAccess());
    this.store.dispatch(new AppActions.RemoveRouteState());
  }

}
