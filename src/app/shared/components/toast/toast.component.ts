import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { AppController } from 'src/app/core/appController';
import { NgDialogDefault } from 'src/app/core/ng-dialog';

@Component({
  selector: 'ng-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent extends NgDialogDefault implements OnInit {
  public message: string;
  public title: string;

  constructor(
    public dialogRef: MatDialogRef<ToastComponent>,
    protected formBuilder: FormBuilder,
    public appController: AppController,
    protected dialog: MatDialog,
    protected renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data) {
    super(dialogRef, formBuilder, appController, false);
  }

  ngOnInit(): void {
    this.setComponentState();
  }

  setComponentState(): void {
    const { title, message } = this.data;
    this.message = message;
    this.title = title;
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

  public fillForm() {
    throw new Error("Method not implemented.");
  }
}
