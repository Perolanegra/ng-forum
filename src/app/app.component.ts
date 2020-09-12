import { Component, ChangeDetectorRef } from '@angular/core';
import { AppController } from './core/appController';
import { AuthState } from './state/auth/auth.state';
import { Select, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { AuthActions } from './state/auth/auth.actions';
import { MediaMatcher } from '@angular/cdk/layout';
import { AppActions } from './state/app/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-forum';

  @Select(AuthState.token) token$: Observable<string>;
  @Select(AuthState.notAuth) notAuth$: Observable<string>;

  hasToken; notAuth;
  private mobileQuery: MediaQueryList;
  private fillerNavSubscription$: Subscription;
  private tokenSubscription$?: Subscription;
  private notAuthSubscription$?: Subscription;

  constructor(private appController: AppController,
    changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private actions: Actions,
    private store: Store
  ) {
    this.setRoutesLocalStorage();

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.store.dispatch(new AppActions.SetMediaScreen(this.mobileQuery.matches));
    this.actions.pipe(ofActionDispatched(AuthActions.RemoveAccess)).subscribe(() => this.appController.navigate('login'))
    this.getAuth();
  }

  setRoutesLocalStorage(): void {
    this.fillerNavSubscription$ = this.appController.getFillerNav().subscribe(routes => {
      if (!routes) {
        this.appController.fillerNavs().then((filler: any) => {
          this.store.dispatch(new AppActions.SetRouteState(filler));
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    if (this.fillerNavSubscription$) this.fillerNavSubscription$.unsubscribe();
    if (this.tokenSubscription$) this.tokenSubscription$.unsubscribe();
    if (this.notAuthSubscription$) this.notAuthSubscription$.unsubscribe();
  }

  getAuth() {
    this.tokenSubscription$ = this.token$.subscribe(token => this.hasToken = token);
    this.notAuthSubscription$ = this.notAuth$.subscribe(notAuth => this.notAuth = notAuth);
  }

}

