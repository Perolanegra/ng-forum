import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
@Component({
    selector: 'app-main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

    fillerNav;
    mobileQuery: MediaQueryList;

    constructor(changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    ) { 
        this.getfillerNav();
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


}
