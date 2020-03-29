import { Component, OnInit, ChangeDetectorRef, ElementRef  } from '@angular/core';
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

    public vistoPic = '../../assets/svg/moderator-male.svg';


    constructor(changeDetectorRef: ChangeDetectorRef, 
    private breakpointObserver: BreakpointObserver,
    public media: MediaMatcher,
    private mainNavStyle: MainNavStyle,
    private appController: AppController
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
        this.hasEnterMenuRef = !this.hasEnterMenuRef;
        this.mainNavStyle.setStyleMenuNavInit(elementRef, this.mobileQuery.matches);
    }


}
