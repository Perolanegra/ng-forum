import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild  } from '@angular/core';
import {MediaMatcher, BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import { Subscription } from 'rxjs/internal/Subscription';
import { AppController } from '../core/appController';
import { MainNavStyle } from './main-nav.style';
@Component({
    selector: 'app-main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

    mobileQuery: MediaQueryList;
    hasEnterMenuRef: boolean = false;
    profileDefault: string = '../../../../assets/imgs/profile-default.jfif';
    // smallWidth: boolean
    // private mudancaTamanhoTelaSubscription: Subscription;
    @ViewChild('userInfo') elRefUserInfo: ElementRef;
    @ViewChild('navListRoutes') elRefnavListRoutes: ElementRef;
    
    public vistoPic = '../../assets/svg/moderator-male.svg';


    constructor(changeDetectorRef: ChangeDetectorRef, 
    private breakpointObserver: BreakpointObserver,
    public media: MediaMatcher,
    private mainNavStyle: MainNavStyle,
    public appController: AppController
    ) { 
        // this.mudancaTamanhoTelaSubscription = this.breakpointObserver
        //     .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
        //     .subscribe((state: BreakpointState) => {

        //         this.smallWidth = state.matches;
        //     });
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
        return JSON.parse(localStorage.getItem('fillerNav'));
    }

    onMenuBlur(hasEnterMenu) {
        this.hasEnterMenuRef = hasEnterMenu;
    }

    toggleMenu(elementRef: Element) {
        this.hasEnterMenuRef = true;
        this.mainNavStyle.setStyleMenuNavInit(elementRef, this.mobileQuery.matches);

        if(this.elRefUserInfo && this.elRefnavListRoutes) {
            this.appController.removeElementClass(this.elRefUserInfo.nativeElement, 'div-fade-out');
            this.appController.removeElementClass(this.elRefUserInfo.nativeElement, 'fade-transition-out');
            this.appController.setElementClass(this.elRefUserInfo.nativeElement, 'fade-transition-in');
    
            this.appController.removeElementClass(this.elRefnavListRoutes.nativeElement, 'div-fade-out');
            this.appController.removeElementClass(this.elRefnavListRoutes.nativeElement, 'fade-transition-out');
            this.appController.setElementClass(this.elRefnavListRoutes.nativeElement, 'fade-transition-in');
        }

    }

    closeSideMenuMobile(elementRefSideMenu: ElementRef) { // quando o ElementRef vem de referência, ele já passa o nativeElement
        this.appController.removeElementClass(elementRefSideMenu, 'side-menu-init--active');

        this.appController.setElementClass(this.elRefUserInfo.nativeElement, 'div-fade-out');
        this.appController.removeElementClass(this.elRefUserInfo.nativeElement, 'fade-transition-in');
        this.appController.setElementClass(this.elRefUserInfo.nativeElement, 'fade-transition-out');

        this.appController.setElementClass(this.elRefnavListRoutes.nativeElement, 'div-fade-out');
        this.appController.removeElementClass(this.elRefnavListRoutes.nativeElement, 'fade-transition-in');
        this.appController.setElementClass(this.elRefnavListRoutes.nativeElement, 'fade-transition-out');
    }
 

}
