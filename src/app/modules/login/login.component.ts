import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { AuthActions } from 'src/app/state/auth/auth.actions';
import { EncryptionService } from 'src/app/core/encryption.service';
import { AppController } from 'src/app/core/appController';
import { ForgetPasswordComponent } from 'src/app/modules/login/dialogs/forget-password/forget-password.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthState } from 'src/app/state/auth/auth.state';
import { Observable } from 'rxjs';


@Component({
  selector: 'ng-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { // extends ngForm

  @Select(AuthState.hasResetPass) hasResetPass$: Observable<boolean>;

  public loginForm: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder,
    private store: Store,
    private spinner: NgxSpinnerService,
    private appController: AppController,
    private encryptService: EncryptionService) {
  }

  ngOnInit(): void {
    this.setLoginForm();
    this.hasResetPass$.subscribe(hasResetPass => {
      if (hasResetPass) {
        setTimeout(() => this.store.dispatch(new AuthActions.RemoveHasReset()), 420000);
      }
    });
  }

  setLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  signIn() {
    if (this.isValidForm()) {
      const username = this.loginForm.get('username').value as string;
      const password = this.loginForm.get('password').value as string;
      const encrypted = this.encryptService.set('10610433IA$#@$^@1ERF', password);

      this.spinner.show();
      this.store.dispatch(new AuthActions.Signin(username, encrypted)).subscribe((state) => {
        if (state.auth && state.auth.token) {
          this.appController.setMenuActiveLink('home');
          this.appController.navigate('home');
        }
      });
    }
  }

  isValidForm(): boolean {
    return this.loginForm.valid;
  }

  openForgotPass() {
    this.appController.showToastPopUp({ style: {} }, ForgetPasswordComponent);
  }

}
