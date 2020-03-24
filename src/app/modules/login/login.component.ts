import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor() { }

  ngOnInit(): void {
  }

  signIn() {
    console.log('metodo de entrar na conta do cara e levar ele prahome');
  }

  

}
