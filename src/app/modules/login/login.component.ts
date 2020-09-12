import { Component, OnInit, ElementRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { AuthActions } from 'src/app/state/auth/auth.actions';
import { EncryptionService } from 'src/app/core/encryption.service';
import { AppController } from 'src/app/core/appController';
import { ForgetPasswordComponent } from 'src/app/modules/login/dialogs/forget-password/forget-password.component';
import { AuthState } from 'src/app/state/auth/auth.state';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from 'src/app/core/ng-form';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'ng-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends NgForm implements OnInit, OnDestroy {

  @Select(AuthState.token) token$: Observable<string>;
  @Select(AuthState.hasResetPass) hasResetPass$: Observable<boolean>;
  public hasResetPassSubscription$: Subscription;

  constructor(protected formBuilder: FormBuilder,
    private store: Store,
    protected appController: AppController,
    protected spinner: NgxSpinnerService,
    private encryptService: EncryptionService) {
    super(formBuilder, appController, false);
  }

  ngOnInit(): void {
    this.setForm();
    this.setResetPass();
    this.setErrorValidation();
    this.getResponse();
  }

  ngOnDestroy(): void {
    this.responseSubscription$ ?? this.responseSubscription$.unsubscribe();
    this.hasResetPassSubscription$ ?? this.hasResetPassSubscription$.unsubscribe();
  }

  setResetPass() {
    this.hasResetPass$
      .subscribe(hasResetPass => {
        if (hasResetPass) setTimeout(() => this.store.dispatch(new AuthActions.RemoveHasReset()), 420000); // 7min p fzr outra requisição.
      });
  }

  setErrorValidation(): void {
    const pass_msg = this.getErrorMessages(4, true);
    const pass_type = this.getErrorTypes(3, true);

    const username_msg = [...this.getErrorMessages(0), ...this.getErrorMessages(4), ...this.getErrorMessages(6)];
    const username_type = [...this.getErrorTypes(0), ...this.getErrorTypes(1), ...this.getErrorTypes(5)];

    this.setErrorMsgs('username', username_type, username_msg);
    this.setErrorMsgs('password', pass_type, pass_msg);
  }

  setForm() {
    this._form.addControl('username', new FormControl(null, [Validators.required, CustomValidators.allblank]));
    this._form.addControl('password', new FormControl(null, [Validators.required, CustomValidators.whitespace]));
    this.setInitControlsPadding();
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
    if (this.isValidForm(password?.length)) {
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
    return passLength < 8 ? false : this.hasClickSubmit = this._form.valid;
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
