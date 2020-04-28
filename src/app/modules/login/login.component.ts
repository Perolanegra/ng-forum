import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVars } from 'src/app/core/globalVars';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Store, Select } from '@ngxs/store';
import { AuthActions } from 'src/app/state/auth/auth.actions';
import { AuthState, AuthStateModel } from 'src/app/state/auth/auth.state';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { EncryptionService } from 'src/app/core/encryption.service';
import { map } from 'rxjs/operators';

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
    private encryptService: EncryptionService,
    private globalVars: GlobalVars) { }


  @Select(AuthState.userDetails) user$: Observable<UserModel>;

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
      const password = this.loginForm.get('password').value as string;
      const encrypted = this.encryptService.set('10610433IA$#@$^@1ERF', password);

      this.store.dispatch(new AuthActions.Signin(username, encrypted));

      // this.globalVars.setUserLoggedIn(user);
      // console.log('user: ', user);
      // if (!user) {
      //   throw new Error('Login ou senha inválidos.');
      // }

      

      // this.router.navigate(['home']).catch(error => {
      //   console.log('erro: ', error);
      // });

    }
  }

  isValidForm(): boolean {
    return this.loginForm.valid;
  }


}
