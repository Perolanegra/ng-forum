import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { AppController } from '../../core/appController';
import { MainNavStyle } from './main-nav.style';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Select } from '@ngxs/store';
import { AppState } from 'src/app/shared/state/app.state';

@Component({
    selector: 'ng-main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['./main-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainNavComponent implements OnInit {

    public routes;
    public vistoPic = '../../assets/imgs/moderator-male.svg';
    public hasMobileMatches: boolean;
    public hasEnterMenuRef: boolean = false;
    public profileDefault: string = '../../../../assets/imgs/profile-default.jfif';

    @ViewChild('userInfo') elRefUserInfo: ElementRef;
    @ViewChild('navListRoutes') elRefnavListRoutes: ElementRef;

    @Select(AppState.hasMobileMatches) stateMobileMatches$: Observable<any>;

    private stateMobileMatchesSubscription$: Subscription;

    constructor(
        public router: Router,
        private mainNavStyle: MainNavStyle,
        public appController: AppController) { }


    ngOnInit() {
        this.routes = this.appController.getFillerNav();
        this.stateMobileMatchesSubscription$ = this.stateMobileMatches$.subscribe(state => this.hasMobileMatches = state);
    }

    ngOnDestroy(): void {
        this.stateMobileMatchesSubscription$.unsubscribe();
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
