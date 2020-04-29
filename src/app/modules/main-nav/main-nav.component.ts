import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { AppController } from '../../core/appController';
import { MainNavStyle } from './main-nav.style';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
    selector: 'ng-main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['./main-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainNavComponent implements OnInit {

    hasMobileMatches: boolean;
    hasEnterMenuRef: boolean = false;
    profileDefault: string = '../../../../assets/imgs/profile-default.jfif';

    @ViewChild('userInfo') elRefUserInfo: ElementRef;
    @ViewChild('navListRoutes') elRefnavListRoutes: ElementRef;

    private routeDetector: Subscription;

    public vistoPic = '../../assets/imgs/moderator-male.svg';

    constructor(
        public router: Router,
        // private breakpointObserver: BreakpointObserver,
        private store: Store,
        private mainNavStyle: MainNavStyle,
        public appController: AppController
    ) {
        this.store.select(state => this.hasMobileMatches = state.stateMobileMatches);
    }

    public routes = this.appController.getRoutesNav().routes;

    public state$: Observable<any>;

    ngOnInit() {
        this.setMenuActiveLink('home');
        this.getFillerNav();
    }

    ngOnDestroy(): void {
        this.routeDetector.unsubscribe();
    }

    getFillerNav() {
        this.routeDetector = this.state$.subscribe((hasChanged) => {
            if (hasChanged) this.routes = this.appController.getRoutesNav().routes;
        });
    }

    onMenuBlur(hasEnterMenu) {
        this.hasEnterMenuRef = hasEnterMenu;
    }

    toggleMenu(elementRef: Element) {
        this.hasEnterMenuRef = true;
        this.mainNavStyle.setStyleMenuNavInit(elementRef, this.hasMobileMatches);
    }

    closeSideMenuMobile(elementRefSideMenu: ElementRef) { // quando o ElementRef vem de referência, ele já passa o nativeElement
        this.appController.removeElementClass(elementRefSideMenu, 'side-menu-init--active');
        this.mainNavStyle.setStyleMenuNavClose(this.elRefUserInfo.nativeElement, this.hasMobileMatches);
    }

    setMenuActiveLink(path: string) {
        const routes = this.routes;

        routes.map((prop) => {
            prop.isActive = false;

            if (prop.path === path) {
                prop.isActive = true;
                return;
            }
        });

        this.appController.setRoutesNav({ routes });
        this.state$ = Observable.create(observer => observer.next(routes));
    }

    navigate(path: string) {
        this.appController.navigate(path);
        this.setMenuActiveLink(path);
    }



}
