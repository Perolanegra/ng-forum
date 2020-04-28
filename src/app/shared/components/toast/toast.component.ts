import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ng-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  @Input() public message: string = 'Usuário ou senha incorreta.'
  @Input() public hasMobileMatches: boolean = false;

  constructor() {


  }

  closeToast() {
    console.log('pediu pra fechar');
    
  }

  ngOnInit(): void {
    console.log('entrei aqui');
    
  }

  info(message, title, options) {
    this.alerts("info", message, title, "icon-info-sign", options);
  };

  warning(message, title, options = null) {
    this.alerts("warning", message, title, "icon-warning-sign", options);
  }

  error(message, title, options) {
    this.alerts("error", message, title, "icon-minus-sign", options);
  };

  success(message, title, options) {
    this.alerts("success", message, title, "icon-ok-sign", options);
  };

  alerts(type, message, title, icon, options) {
    console.log(type, message, title, icon)


  }




}
