import { Component, OnInit, Injectable, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ng-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, AfterViewInit {

  public message: string;
  public hasMobileMatches: boolean;
  public title: string;
  public elementHeight: string;


  constructor(
    public dialogRef: MatDialogRef<ToastComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.hasMobileMatches = localStorage.getItem('hasMobileMatches') === 'true';
    }

    closeToast(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    Promise.resolve(null).then(() => 
    this.elementHeight = ((<HTMLElement>document.getElementById('base-height')).offsetHeight).toString().concat('px'));
  }

  ngOnInit(): void {
    const { title, message } = this.data;
    this.message = message;
    this.title = title;    
  }

  info(title: string, msg: string, hasMobileMatches: boolean) {
    
  };

  warning(message, title, options = null) {
    this.alerts("warning", message, title, "icon-warning-sign", options);
  }

  error() {
    
    
  };

  success(message, title, options) {
    this.alerts("success", message, title, "icon-ok-sign", options);
  }

  alerts(bol, bal, va, as, ds) {

  }



}
