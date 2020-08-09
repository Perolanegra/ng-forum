import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastComponent } from '../toast/toast.component';
import { FormBuilder } from '@angular/forms';
import { AppController } from 'src/app/core/appController';
import { NgDialogDefault } from 'src/app/core/ng-dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent extends NgDialogDefault implements OnInit {

  public message: string;
  public title: string;
  public btnYes: string;
  public btnNo: string;
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

  ngOnInit(): void {
    this.setData();
  }

  ngAfterViewInit() {
    Promise.resolve(null).then(() =>
      this.elementHeight = ((<HTMLElement>document.getElementById('base-height')).offsetHeight).toString().concat('px'));
  }

  setData() {
    const { title, message, btnYes, btnNo } = this.data;
    this.title = title || 'Atenção';
    this.message = message || 'Você confirma a operação a seguir?';
    this.btnNo = btnNo || 'Não';
    this.btnYes = btnYes || 'Sim';
  }

  public setErrorValidation() {
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
