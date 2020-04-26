import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVars } from 'src/app/core/globalVars';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Store, Select } from '@ngxs/store';
import { AuthActions } from 'src/app/state/auth/auth.actions';
import { AuthState, AuthStateModel } from 'src/app/state/auth/auth.state';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  hide = true;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private store: Store,
    private auth: AuthService,
    private globalVars: GlobalVars) { }

  // @Select(AuthState.userDetails) user$: Observable<UserModel>;

  ngOnInit(): void {
    this.setLoginForm();
  }

  setLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      saveState: new FormControl(false)
    });
  }

  signIn() {
    if (this.isValidForm()) {

      const username = this.loginForm.get('username').value as string;
      const password = this.loginForm.get('password').value as string

      this.store.dispatch(new AuthActions.Signin(username, password))
        .subscribe((data: any) => {
          const { user } = data.auth;
          this.globalVars.setUserLoggedIn(user);

          this.router.navigate(['home']).catch(error => {
            console.log('erro: ', error);
          });
        }, error => { });

    }
  }


  isValidForm(): boolean {
    return this.loginForm.valid;
  }



}
