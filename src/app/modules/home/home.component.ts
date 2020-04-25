import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVars } from 'src/app/core/globalVars';
import { Store } from '@ngxs/store';
import { AddTutorial } from 'src/app/actions/tutorial.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    public globalVars: GlobalVars,
    private store: Store
  ) { 
  }
  ngOnInit(): void {
  }

  signOut() {
    alert('you will be redirected in a few seconds...');
    this.globalVars.removeUserLoggedIn();
  }

  ngOnDestroy() {
    // this.globalVars.setStateActiveRoute('home', 'profile'); // onde tiver a chamada do navigate
  }

  clickMe() {
    this.globalVars.removeUserLoggedIn();
    this.router.navigate(['login']).catch(error => { // dps tirar daqui e por o guarda de rota
      console.log('erro navegação: ', error);
    });
  }

  addTutorial(name, url) {
    this.store.dispatch(new AddTutorial({name: name, url: url}))
  }

}
