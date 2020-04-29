import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, ChangeDetectionStrategy, AfterViewChecked  } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AppController } from '../../core/appController';
import { MainNavStyle } from './main-nav.style';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'ng-main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['./main-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainNavComponent implements OnInit, AfterViewChecked {

    mobileQuery: MediaQueryList;
    hasEnterMenuRef: boolean = false;
    profileDefault: string = '../../../../assets/imgs/profile-default.jfif';
   
    @ViewChild('userInfo') elRefUserInfo: ElementRef;
    @ViewChild('navListRoutes') elRefnavListRoutes: ElementRef;

    private routeDetector: Subscription;
    
    public vistoPic = '../../assets/imgs/moderator-male.svg';

    constructor(changeDetectorRef: ChangeDetectorRef, 
    public router: Router,
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
    public routes = this.appController.getRoutesNav().routes;
  
    public state$: Observable<any>;

    ngOnInit() {
        this.setMenuActiveLink('home');
        this.getFillerNav();
    }

    ngAfterViewChecked() {
        localStorage.setItem('hasMobileMatches', JSON.stringify(this.mobileQuery.matches));
    }


    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.routeDetector.unsubscribe();
    }

    getFillerNav() {
        this.routeDetector = this.state$.subscribe((hasChanged) => {
            if(hasChanged) this.routes = this.appController.getRoutesNav().routes;
        });
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
        this.mainNavStyle.setStyleMenuNavClose(this.elRefUserInfo.nativeElement, this.mobileQuery.matches);
    }
 
    setMenuActiveLink(path: string) {
        const routes = this.routes;
        
        routes.map((prop) => {
            prop.isActive = false;

            if(prop.path === path) {
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
