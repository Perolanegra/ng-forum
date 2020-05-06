import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { AuthActions } from 'src/app/state/auth/auth.actions';
import { EncryptionService } from 'src/app/core/encryption.service';
import { AppController } from 'src/app/core/appController';
import { ForgetPasswordComponent } from 'src/app/shared/components/reset-password/forget-password.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthState } from 'src/app/state/auth/auth.state';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  @Select(AuthState.token) token$: Observable<string>;

  private tokenSubscription$: Subscription;


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
  }

  ngOnDestroy() {
    this.tokenSubscription$.unsubscribe();
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
      this.store.dispatch(new AuthActions.Signin(username, encrypted));

      this.tokenSubscription$ = this.token$.subscribe((token) => token ? this.appController.navigate('home') : '');
    }
  }

  isValidForm(): boolean {
    return this.loginForm.valid;
  }

  openForgotPass() {
    this.appController.showToastPopUp({ style: {} }, ForgetPasswordComponent);
  }


}
