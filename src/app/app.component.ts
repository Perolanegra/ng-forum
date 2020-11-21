import { Component, ChangeDetectorRef } from '@angular/core';
import { AppController } from './core/appController';
import { AuthState } from './state/auth/auth.state';
import { Select, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { AuthActions } from './state/auth/auth.actions';
import { MediaMatcher } from '@angular/cdk/layout';
import { AppActions } from './state/app/app.actions';
import { NgDefault } from './core/pattern/ng-default';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends NgDefault {
  title = 'ng-forum';

  @Select(AuthState.token) token$: Observable<string>;
  @Select(AuthState.notAuth) notAuth$: Observable<string>;

  hasToken; notAuth;
  private mobileQuery: MediaQueryList;
  private fillerNavSubscription$: Subscription;
  private tokenSubscription$?: Subscription;
  private notAuthSubscription$?: Subscription;

  constructor(protected appController: AppController,
    changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private actions: Actions,
    private store: Store
  ) {
    super(appController);
    this.setRoutesLocalStorage();

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.appController.dipatchMobileMatches(this.mobileQuery.matches);
    this.actions.pipe(ofActionDispatched(AuthActions.RemoveAccess)).subscribe(() => this.appController.navigate('login'))
    this.getAuth();
  }

  setRoutesLocalStorage(): void {
    this.fillerNavSubscription$ = this.appController.getFillerNav().subscribe(routes => {
      if (!routes) {
        const navs = this.appController.fillerNavs();
        this.store.dispatch(new AppActions.SetRouteState(navs));
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

