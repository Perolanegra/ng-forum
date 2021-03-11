import { Subscription, Observable } from "rxjs";
import { AppController } from "../appController";
import { AuthState } from "src/app/state/auth/auth.state";
import { Select } from "@ngxs/store";

export abstract class NgDefault {
  public hasClickSubmit: boolean = false;

  public stateMobileMatchesSubscription$: Subscription;

  private _hasMobileMatches: boolean;

  public logo: string;

  public hasToken;
  public notAuth;

  @Select((state) => state.app.hasMobileMatches)
  hasMobileMatches$: Observable<any>;

  @Select(AuthState.token) token$: Observable<string>;
  @Select(AuthState.notAuth) notAuth$: Observable<string>;

  constructor(protected appController: AppController) {
    this.logo = this.appController.getImg("logo.png");
    this.appController.getMobileMatches().then((resp) => {
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

  getAuth() {
    this.token$.subscribe((token) => (this.hasToken = token));
    this.notAuth$.subscribe((notAuth) => (this.notAuth = notAuth));
  }
}
