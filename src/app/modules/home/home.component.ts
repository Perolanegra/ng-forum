import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVars } from 'src/app/core/globalVars';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    public globalVars: GlobalVars
  ) { }

  ngOnInit(): void {
    console.log('imhere');
  }

  signOut() {
    alert('you will be redirected in a few seconds...');
    this.globalVars.removeUserLoggedIn();
  }

  ngOnDestroy() {
    this.globalVars.setStateActiveRoute('home', 'profile'); // onde tiver a chamada do navigate
  }

  clickMe() {
    this.router.navigate(['profile']).catch(error => {
        console.log('erro navegação: ', error);
    })
}

}
