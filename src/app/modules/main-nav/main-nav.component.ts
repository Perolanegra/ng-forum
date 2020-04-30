import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { AppController } from '../../core/appController';
import { MainNavStyle } from './main-nav.style';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { AppActions } from 'src/app/shared/state/app.actions';

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

    public vistoPic = '../../assets/imgs/moderator-male.svg';

    fillerSubs: Subscription;

    constructor(
        public router: Router,
        // private breakpointObserver: BreakpointObserver,
        private store: Store,
        private mainNavStyle: MainNavStyle,
        public appController: AppController
    ) {
        this.store.select(state => this.hasMobileMatches = state.app.hasMobileMatches);
    }

    public routes;

    public state$: Observable<any>;

    ngOnInit() {
        this.appController.setMenuActiveLink('home');
        this.fillerSubs = this.appController.getFillerNav().subscribe(routes => {
            this.routes = routes;
        });
    }

    ngOnDestroy(): void {
        this.fillerSubs.unsubscribe();
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

    navigate(path: string) {
        this.appController.navigate(path);
        this.appController.setMenuActiveLink(path);
    }



}
