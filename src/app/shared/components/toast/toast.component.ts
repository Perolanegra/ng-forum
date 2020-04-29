import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
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
  public hasClosed: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<ToastComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.hasMobileMatches = localStorage.getItem('hasMobileMatches') === 'true';
  }

  closeToast(): void {
    this.hasClosed = true;
    this.dialogRef.close();
  }

  public getStyle(trueValue, falseValue) {
    return this.hasMobileMatches ? trueValue : falseValue;
  }

  public getBallBackground() {
    const call = {
      error: () => { return 'red' },
      info: () => { return 'blue' },
      warning: () => { return 'orange' },
      success: () => { return 'green' },
    }

    const { type } = this.data;
    return call[type]();
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

}
