import { Component, OnInit, NgZone, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { AuthActions } from 'src/app/state/auth/auth.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, Observable } from 'rxjs';
import { AuthState } from 'src/app/state/auth/auth.state';
import { AppController } from 'src/app/core/appController';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { EncryptionService } from 'src/app/core/encryption.service';
import { NgForm } from 'src/app/core/ng-form';

@Component({
  selector: 'ng-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent extends NgForm implements OnInit, OnDestroy {

  @Select(AuthState.rPassResponse) rPassResponse$: Observable<any>;

  @Select(AuthState.token) token$: Observable<string>;
  private tokenSubscription$: Subscription;

  constructor(protected formBuilder: FormBuilder,
    protected store: Store,
    protected ngZone: NgZone,
    private spinner: NgxSpinnerService,
    private encryptService: EncryptionService,
    public appController: AppController) {
    super(formBuilder, appController, ngZone, false);
  }

  ngOnInit(): void {
    this.setForm();
    this.setErrorValidation();
    this.getResponse();
  }

  public setForm(): void {
    this.setComparableFormValues('new_password', 'verify_password');
    this._form.addControl('new_password', new FormControl(null, [Validators.required, CustomValidators.whitespace]));
    this._form.addControl('verify_password', new FormControl(null, [Validators.required, CustomValidators.whitespace, this.matchValues.bind(this)]));
    this.initStyleFormErrorMsg();
  }

  ngOnDestroy() {
    this.responseSubscription$ ?? this.responseSubscription$.unsubscribe();
    this.stateMobileMatchesSubscription$ ?? this.stateMobileMatchesSubscription$.unsubscribe();
    this.tokenSubscription$ ?? this.tokenSubscription$.unsubscribe();
    this.store.dispatch(new AuthActions.SetResetedPassword(true));
  }

  setErrorValidation(): void {
    const new_pass_msg = this.getErrorMessages(3, true);
    const new_pass_type = this.getErrorTypes(3, true);

    const verify_pass_msg = this.getErrorMessages(4, true, -1);
    const verify_pass_type = this.getErrorTypes(4, true, -1);

    this.setErrorMsgs('new_password', new_pass_type, new_pass_msg);
    this.setErrorMsgs('verify_password', verify_pass_type, verify_pass_msg);
  }

  getResponse() {
    this.responseSubscription$ = this.rPassResponse$.subscribe(async (data) => {
      if (data) {
        this.store.dispatch(new AuthActions.RemoveToken());
        this.store.dispatch(new AuthActions.RemoveNotAuth());
        this.spinner.hide();
        this.showToast(data);
        setTimeout(() => this.appController.navigate('login'), 300);
      }
    });
  }

  async submit(): Promise<void> {
    if (this.isValidForm()) {
      this.spinner.show();
      this.tokenSubscription$ = this.token$.subscribe(access_token => {
        const passForm = this.formControls.verify_password.value;
        if (access_token && passForm) {
          const enrypted = this.encryptService.set('10610433IA$#@$^@1ERF', passForm);
          this.store.dispatch(new AuthActions.ResetPass({ access_token, password: enrypted }));
          this._form.reset();
          this.stateSubmitHasChanged();
        }
      });
    }
  }

}
