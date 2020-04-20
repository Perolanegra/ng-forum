import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild  } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AppController } from '../../core/appController';
import { MainNavStyle } from './main-nav.style';
import { Router } from '@angular/router';

@Component({
    selector: 'ng-main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

    mobileQuery: MediaQueryList;
    hasEnterMenuRef: boolean = false;
    profileDefault: string = '../../../../assets/imgs/profile-default.jfif';
   
    @ViewChild('userInfo') elRefUserInfo: ElementRef;
    @ViewChild('navListRoutes') elRefnavListRoutes: ElementRef;
    
    public vistoPic = '../../assets/svg/moderator-male.svg';

    constructor(changeDetectorRef: ChangeDetectorRef, 
    private router: Router,
    // private breakpointObserver: BreakpointObserver,
    public media: MediaMatcher,
    private mainNavStyle: MainNavStyle,
    public appController: AppController
    ) { 
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    
    private _mobileQueryListener: () => void;

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    getfillerNav() {
        return this.appController.getRoutesNav();
    }

    onMenuBlur(hasEnterMenu) {
        this.hasEnterMenuRef = hasEnterMenu;
    }

    toggleMenu(elementRef: Element) {
        this.hasEnterMenuRef = true;
        this.mainNavStyle.setStyleMenuNavInit(elementRef, this.mobileQuery.matches);
    }

    closeSideMenuMobile(elementRefSideMenu: ElementRef) { // quando o ElementRef vem de referência, ele já passa o nativeElement
        this.appController.removeElementClass(elementRefSideMenu, 'side-menu-init--active');
        this.mainNavStyle.setStyleMenuClose(this.elRefUserInfo.nativeElement, this.mobileQuery.matches);
        this.mainNavStyle.setStyleMenuClose(this.elRefnavListRoutes.nativeElement, this.mobileQuery.matches);
    }
 
    setMenuActiveLink(path: string) {
        const { routes } = this.getfillerNav();
        // const url = this.router.url; url.includes(prop.path) fazer o observable

        routes.map((prop) => {
            prop.isActive = false;

            if(prop.path === path) {
                prop.isActive = true;
                return;
            }
        });

        this.appController.setRoutesNav({ routes });
    }

    navigate(path: string) {
        // console.log('rota agr: ', this.router.url);
        // console.log('rota nova: ', path);
        
        this.appController.navigate(path);
        this.setMenuActiveLink(path);
    }

}
