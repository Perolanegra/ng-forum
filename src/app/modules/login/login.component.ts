import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVars } from 'src/app/core/globalVars';
import { UserModel } from 'src/app/shared/models/user/user.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

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
    private globalVars: GlobalVars) { }

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

  signIn() { // make login Request

    if(this.isValidForm()) {
      const userAuth: UserModel = {
        _id: 'string',
        name: 'string',
        statusMsg: 'string',
        phone: 'string',
        email: 'string',
        password: 'string',
        img: 'string',
        birthDate: new Date(),
        created_at: new Date(),
        deleted_at: new Date(),
        updated_at: new Date()
      };
      this.globalVars.setUserLoggedIn(userAuth);
      
      this.router.navigate(['home']).catch(error => {
        console.log('erro: ', error);
      });
    }
    
    console.log('metodo SignIn');
  }

  isValidForm(): boolean {
    return this.loginForm.valid;
  }

  

}
