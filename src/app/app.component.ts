import { Component, ChangeDetectorRef, HostListener } from '@angular/core';
import { AppController } from './core/appController';
import { Store, Actions, ofActionDispatched } from '@ngxs/store';
import {  Subscription } from 'rxjs';
import { AuthActions } from './state/auth/auth.actions';
import { MediaMatcher } from '@angular/cdk/layout';
import { AppActions } from './state/app/app.actions';
import { NgDefault } from './core/pattern/ng-default';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends NgDefault {
  title = 'ng-forum';

  private mobileQuery: MediaQueryList;
  private fillerNavSubscription$: Subscription;

  constructor(protected appController: AppController,
    changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private actions: Actions,
    private store: Store,
    protected route: ActivatedRoute
  ) {
    super(appController, route);
    this.setRoutesLocalStorage();

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.appController.dipatchMobileMatches(this.mobileQuery.matches);
    this.actions.pipe(ofActionDispatched(AuthActions.RemoveAccess)).subscribe((val) => this.appController.navigate('login'))
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
  }

  @HostListener('window:hasToken', ['$event'])
  hasAccessToken = (event) => this.hasToken = event.detail.hasToken;

}

