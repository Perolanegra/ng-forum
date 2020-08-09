import { Component, OnInit, Inject, AfterViewInit, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NgDialog } from 'src/app/core/ng-dialog';
import { FormBuilder } from '@angular/forms';
import { AppController } from 'src/app/core/appController';

@Component({
  selector: 'ng-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent extends NgDialog implements OnInit, AfterViewInit {

  public message: string;
  public title: string;
  public elementHeight: string;

  constructor(
    public dialogRef: MatDialogRef<ToastComponent>,
    protected formBuilder: FormBuilder,
    public appController: AppController,
    protected dialog: MatDialog,
    protected renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data) {
    super(dialogRef, formBuilder, appController, false);
  }

  ngAfterViewInit() {
    Promise.resolve(null).then(() =>
      this.elementHeight = ((<HTMLElement>document.getElementById('base-height')).offsetHeight).toString().concat('px'));
  }

  ngOnInit(): void {
    this.setData();
  }

  setData(): void {
    const { title, message } = this.data;
    this.message = message;
    this.title = title;
  }

  public setDialogForm(): void {
    throw new Error("Method not implemented.");
  }

  public setErrorValidation(): void {
    throw new Error("Method not implemented.");
  }

  public setForm(): void {
    throw new Error("Method not implemented.");
  }

  public getResponse() {
    throw new Error("Method not implemented.");
  }

  public submit(): void {
    throw new Error("Method not implemented.");
  }

}
