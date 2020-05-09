import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
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
  template: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
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
    this.setErrorValidation();
    this.getResponse();
  }

  setForm(): void {
    this._form.addControl('name', new FormControl(null, [Validators.required, CustomValidators.whitespace]));
    this._form.addControl('username', new FormControl(null, [Validators.required]));
    this._form.addControl('email', new FormControl(null, [Validators.required, CustomValidators.whitespace])); // validar com emailMask dps
    this._form.addControl('password', new FormControl(null, [Validators.required, CustomValidators.whitespace]));
    this._form.addControl('verify_password', new FormControl(null, Validators.compose([Validators.required, CustomValidators.whitespace, this.matchValues.bind(this)])));
  }

  ngOnDestroy() {
    this.responseSubscription$ ? this.responseSubscription$.unsubscribe() : null;
    this.stateMobileMatchesSubscription$ ? this.stateMobileMatchesSubscription$.unsubscribe() : null;
  }

  setErrorValidation(): void {
    const pass_msg = this.getErrorMessages(3, true, 3);
    const pass_type = this.getErrorTypes(3, true, 3);
    
    const verify_pass_msg = this.getErrorMessages(4, true, -1);
    const verify_pass_type = this.getErrorTypes(4, true, -1);

    const username_msg = this.getErrorMessages(0);
    const username_type = this.getErrorTypes(0);
    
    this.seErrorMsgs('password', pass_type, pass_msg);
    this.seErrorMsgs('verify_password', verify_pass_type, verify_pass_msg);
    this.seErrorMsgs('name', pass_type, pass_msg);
    this.seErrorMsgs('username', username_type, username_msg);
    this.seErrorMsgs('email', pass_type, pass_msg); // setar emailMask dps
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
      const encrypted = this.encryptService.set('10610433IA$#@$^@1ERF', this.formControls.verify_password.value);
      this.formControls.verify_password.setValue(encrypted);
      const payload = this._form.value;
      this.store.dispatch(new AuthActions.Signup(payload));
      this._form.reset();
      this.stateSubmitHasChanged();
    }
  }
  
}