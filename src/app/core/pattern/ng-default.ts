import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app/app.state';

export abstract class NgDefault {

    public hasClickSubmit: boolean = false;

    @Select(AppState.hasMobileMatches) stateMobileMatches$: Observable<any>;
    public stateMobileMatchesSubscription$: Subscription;

    public hasMobileMatches: boolean;
    
    constructor() {
        this.stateMobileMatchesSubscription$ = this.stateMobileMatches$.subscribe(state => this.hasMobileMatches = state);
    }

    public getStyle(trueValue, falseValue): string {
        return this.hasMobileMatches ? trueValue : falseValue;
    }

}