import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastComponent } from '../toast/toast.component';
import { FormBuilder } from '@angular/forms';
import { AppController } from 'src/app/core/appController';
import { DialogDefault } from 'src/app/core/dialog-default';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent extends DialogDefault implements OnInit {

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
    super(dialog, formBuilder, renderer, appController);
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

  close(data?: any) {
    this.dialogRef.close(data);
    this.hasClosed = true;
  }

}
