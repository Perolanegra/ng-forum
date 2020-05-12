import { Component, OnInit, OnDestroy, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { AppController } from 'src/app/core/appController';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthState } from 'src/app/state/auth/auth.state';
import { NgForm } from 'src/app/core/ng-form';
import { EncryptionService } from 'src/app/core/encryption.service';
import { AuthActions } from 'src/app/state/auth/auth.actions';

@Component({
  selector: 'ng-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent extends NgForm implements OnInit, OnDestroy {

  @Select(AuthState.signUpResponse) rSignUpResponse$: Observable<any>;

  constructor(protected formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private store: Store,
    private encryptService: EncryptionService,
    protected ngZone: NgZone,
    protected appController: AppController) {
    super(formBuilder, appController, ngZone, false);
  }

  ngOnInit() {
    this.setForm();
    this.setErrorValidation();
    this.getResponse();
  }

  setForm(): void {
    this._form.addControl('name', new FormControl(null, [Validators.required, CustomValidators.whitespace]));
    this._form.addControl('username', new FormControl(null, [Validators.required]));
    this._form.addControl('email', new FormControl(null, [Validators.required, Validators.email]));
    this._form.addControl('pass', new FormControl(null, [Validators.required, CustomValidators.whitespace]));
    this.initStyleFormErrorMsg();
  }

  ngOnDestroy() {
    this.responseSubscription$ ? this.responseSubscription$.unsubscribe() : null;
    this.stateMobileMatchesSubscription$ ? this.stateMobileMatchesSubscription$.unsubscribe() : null;
  }

  setErrorValidation(): void { // lembrando que tem que ser na ordem, type - msg
    const pass_msg = this.getErrorMessages(3, true, this.lastIndex);
    const pass_type = this.getErrorTypes(3, true, this.lastIndex);

    const username_msg = this.getErrorMessages(1, true, 3);
    const username_type = this.getErrorTypes(2, true, this.lastIndex);

    const email_msg = [...this.getErrorMessages(0), ...this.getErrorMessages(5)];
    const email_type = [...this.getErrorTypes(0), ...this.getErrorTypes(4)];

    const name_msg = [ ...this.getErrorMessages(0), ...this.getErrorMessages(4), ...this.getErrorMessages(2) ];
    const name_type = [ ...this.getErrorTypes(0), ...this.getErrorTypes(1), ...this.getErrorTypes(2) ];

    this.seErrorMsgs('pass', pass_type, pass_msg);
    this.seErrorMsgs('username', username_type, username_msg);
    this.seErrorMsgs('name', name_type, name_msg);
    this.seErrorMsgs('email', email_type, email_msg);
  }

  setStyleLastErrorField(response: any) {
    this.setPadding(response);
  }

  getResponse() {
    this.responseSubscription$ = this.rSignUpResponse$.subscribe(async (data) => {
      if (data) {
        this.spinner.hide();
        this.showToast(data);
        setTimeout(() => this.appController.navigate('login'), 800);
      }
    });
  }

  async submit(): Promise<void> { // centralizar mais dps
    if (this.isValidForm()) {
      this.spinner.show();
      const encrypted = this.encryptService.set('10610433IA$#@$^@1ERF', this.formControls.pass.value);
      this.formControls.pass.setValue(encrypted);
      const payload = this._form.value;
      this.store.dispatch(new AuthActions.Signup(payload));
      this._form.reset();
      this.stateSubmitHasChanged();
    }
  }

  setPadding(response: any) {
    if(!response) {
      return;
    }

    if (!response?.index || response?.index < 2) {
      this.styleFormFieldObject[response.controlName].paddingBottom = '0%';
      return;
    }

    const basePadding = 2.5; // base é 2.5% qd tiver 2 elementos de erro, a cada mais 1 elemento, auemnta 2.5%.
    const resultPadding = basePadding * response.index;
    this.styleFormFieldObject[response.controlName].paddingBottom = `${resultPadding}%`
  }

}