import { Select } from '@ngxs/store';
import { AppState } from 'src/app/shared/state/app.state';
import { Observable, Subscription } from 'rxjs';


export abstract class NgDefault {

    public readonly lastIndex = 9999;

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