import { Subscription } from 'rxjs';
import { AppController } from '../appController';

export abstract class NgDefault {

    public hasClickSubmit: boolean = false;

    public stateMobileMatchesSubscription$: Subscription;

    private _hasMobileMatches: boolean;

    public logo: string;

    constructor(protected appController: AppController) {
        this.logo = this.appController.getImg('logo.png');
        this.appController.getMobileMatches().then(resp => {
            this.hasMobileMatches = resp;
        });
    }

    public getStyle(trueValue, falseValue): string {
        return this.hasMobileMatches ? trueValue : falseValue;
    }

    public set hasMobileMatches(value: boolean) {
        this._hasMobileMatches = value;
    }

    public get hasMobileMatches() {
        return this._hasMobileMatches;
    }

}