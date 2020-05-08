import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { AuthActions } from 'src/app/state/auth/auth.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, Observable } from 'rxjs';
import { AuthState } from 'src/app/state/auth/auth.state';
import { AppController } from 'src/app/core/appController';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { AppState } from 'src/app/shared/state/app.state';
import { EncryptionService } from 'src/app/core/encryption.service';

@Component({
  selector: 'ng-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public hide1 = true;
  public hide2 = true;

  @Select(AuthState.rPassResponse) rPassResponse$: Observable<any>;
  private rPassResponseSubscription$: Subscription;

  @Select(AppState.hasMobileMatches) stateMobileMatches$: Observable<any>;
  private stateMobileMatchesSubscription$: Subscription;

  @Select(AuthState.token) token$: Observable<string>;
  private tokenSubscription$: Subscription;

  public resetForm: FormGroup;
  public hasClickSubmit: boolean = false;
  public hasMobileMatches: boolean;
  public errorMsgs;

  constructor(private formBuilder: FormBuilder,
    private store: Store,
    private ngZone: NgZone,
    private spinner: NgxSpinnerService,
    private encryptService: EncryptionService,
    public appController: AppController) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      new_password: new FormControl(null, [Validators.required, CustomValidators.whitespace]),
      verify_password: new FormControl(null, Validators.compose([Validators.required, CustomValidators.whitespace, this.matchValues.bind(this)])),
    });

    this.stateMobileMatchesSubscription$ = this.stateMobileMatches$.subscribe(state => this.hasMobileMatches = state);

    this.getResponse();
    this.setErrorValidation();
  }

  ngOnDestroy() {
    if (this.rPassResponseSubscription$ && this.stateMobileMatchesSubscription$) {
      this.rPassResponseSubscription$.unsubscribe();
      this.stateMobileMatchesSubscription$.unsubscribe();
      this.tokenSubscription$.unsubscribe();
      this.store.dispatch(new AuthActions.SetResetedPassword(true));
    }
  }

  getResponse() {
    this.rPassResponseSubscription$ = this.rPassResponse$.subscribe(async (data) => {
      if (data) {
        this.store.dispatch(new AuthActions.RemoveToken());
        this.store.dispatch(new AuthActions.RemoveNotAuth());
        this.spinner.hide();
        this.appController.showToastPopUp(data, ToastComponent);
        setTimeout(() => this.appController.navigate('login'), 800);
      }
    });
  }

  async submit(): Promise<void> {
    if (this.resetForm.valid) {
      this.hasClickSubmit = this.resetForm.valid;
      this.spinner.show();

      this.tokenSubscription$ = this.token$.subscribe(access_token => {
        const passForm = this.resetForm.controls.verify_password.value;
        if (access_token && passForm) {
          const password = this.encryptService.set('10610433IA$#@$^@1ERF', this.resetForm.get('verify_password').value);
          this.store.dispatch(new AuthActions.ResetPass({ access_token, password }));
          this.resetForm.reset();
          this.ngZone.runOutsideAngular(() => {
            setTimeout(() => this.hasClickSubmit = !this.hasClickSubmit, 2000);
          });
        }
      });
    }
  }

  public getStyle(trueValue, falseValue) {
    return this.hasMobileMatches ? trueValue : falseValue;
  }

  setErrorValidation(): void {
    let types = ['required', 'minlength', 'whitespace'];
    let msgs = ['O campo é obrigatório.', 'Mínimo de 8 caracteres.', 'Não pode conter espaços em branco.']

    let msgAux = [], typesAux = [];
    msgAux.push(...msgs); msgAux.push('Senhas não coincidem.');
    typesAux.push(...types); typesAux.push('matchValues');

    const { new_password } = this.appController.setErrorValidation('new_password', types, msgs);
    const { verify_password } = this.appController.setErrorValidation('verify_password', typesAux, msgAux);

    this.errorMsgs = { new_password, verify_password };
  }

  matchValues(pControl: FormControl): ValidationErrors {
    if (this.resetForm) {
      const controls = this.resetForm.controls;
      if (pControl.value?.length >= 8 && controls.new_password.value === controls.verify_password.value) {
        return null;
      }
    }

    return { matchValues: true };
  }



}
