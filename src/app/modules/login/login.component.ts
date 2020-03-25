import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVars } from 'src/app/core/globalVars';
import { UserModel } from 'src/app/shared/models/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor(private router: Router,
    private globalVars: GlobalVars) { }

  ngOnInit(): void {
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

    setTimeout(() => {
      this.globalVars.setUserLoggedIn(userAuth);
      if(this.globalVars.isLogged()) {
        this.router.navigate(['home']);
      }
    }, 5000);
  }

  signIn() {
    console.log('metodo de entrar na conta do cara e levar ele prahome');
  }

  

}
