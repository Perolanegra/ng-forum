import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-forum';
   // Implementar um subscription que muda o valor do observable quando o cara loga/desloga,
   // e a partir disso alterar perspectiva no html
  isLoggedIn() {
    return false;
  }
}

