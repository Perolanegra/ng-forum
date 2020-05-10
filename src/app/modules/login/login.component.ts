import { Component, OnInit, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { AuthActions } from 'src/app/state/auth/auth.actions';
import { EncryptionService } from 'src/app/core/encryption.service';
import { AppController } from 'src/app/core/appController';
import { ForgetPasswordComponent } from 'src/app/modules/login/dialogs/forget-password/forget-password.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthState } from 'src/app/state/auth/auth.state';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from 'src/app/core/ng-form';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';


@Component({
  selector: 'ng-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NgForm implements OnInit, OnDestroy {

  @Select(AuthState.token) token$: Observable<string>;
  @Select(AuthState.hasResetPass) hasResetPass$: Observable<boolean>;
  public hasResetPassSubscription$: Subscription;

  constructor(protected formBuilder: FormBuilder,
    private store: Store,
    protected ngZone: NgZone,
    private spinner: NgxSpinnerService,
    protected appController: AppController,
    private encryptService: EncryptionService) {
    super(formBuilder, appController, ngZone, false);
  }

  ngOnInit(): void {
    this.setForm();
    this.setResetPass();
    this.setErrorValidation();
    this.getResponse();
  }

  ngOnDestroy(): void {
    this.responseSubscription$ ? this.responseSubscription$.unsubscribe() : null;
    this.hasResetPassSubscription$ ? this.hasResetPassSubscription$.unsubscribe() : null;
  }

  setResetPass() {
    this.hasResetPass$
      .subscribe(hasResetPass => {
        if (hasResetPass) {
          setTimeout(() => this.store.dispatch(new AuthActions.RemoveHasReset()), 420000); // 7min p fzr outra requisição.
        }
      });
  }

  setErrorValidation(): void {
    const pass_msg = this.getErrorMessages(4, true, this.lastIndex);
    const pass_type = this.getErrorTypes(3, true, this.lastIndex);

    const username_msg = this.getErrorMessages(1, true, 3);
    const username_type = this.getErrorTypes(2, true, this.lastIndex);

    this.seErrorMsgs('username', username_type, username_msg);
    this.seErrorMsgs('password', pass_type, pass_msg);
  }

  setForm() {
    this._form.addControl('username', new FormControl(null, [Validators.required]));
    this._form.addControl('password', new FormControl(null, [Validators.required, CustomValidators.whitespace]));
  }

  getResponse() {
    this.responseSubscription$ = this.token$
      .subscribe((token) => {
        if (token) {
          this.appController.setMenuActiveLink('home');
          this.appController.navigate('home');
        }
      });
  }

  submit(): void {
    const password = this.formControls.password.value as string;
    if (this.isValidForm(password.length)) {
      this.spinner.show();
      const username = this.formControls.username.value as string;
      const encrypted = this.encryptService.set('10610433IA$#@$^@1ERF', password);
      this.store.dispatch(new AuthActions.Signin(username, encrypted));
      this._form.reset();
      this.stateSubmitHasChanged();
    }
  }

  // A validação minlength nesse componente não é um erro, é uma informação obrigatória.
  public isValidForm(passLength: number): boolean {
    return passLength <= 8 ? false : this.hasClickSubmit = this._form.valid;
  }

  openForgotPass() {
    this.appController.showToastPopUp({ style: {} }, ForgetPasswordComponent);
  }

  onClickSignUp(target: ElementRef<any>) {
    this.appController.setElementClass(target, 'btn-sign-up--clicked');
    document.querySelectorAll('span').forEach((element: any) => {
      this.appController.setElementClass(element, 'expanded');
    });
    setTimeout(() => this.appController.navigate('sign-up'), 1200);
  }

}
