import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
    selector: 'app-main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
    @Input() fillerNav: Array<String>;
    mobileQuery: MediaQueryList;
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 

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


}
