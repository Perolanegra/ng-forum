import { Component, OnInit, Inject, AfterViewInit, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogDefault } from 'src/app/core/dialog-default';
import { FormBuilder } from '@angular/forms';
import { AppController } from 'src/app/core/appController';

@Component({
  selector: 'ng-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent extends DialogDefault implements OnInit, AfterViewInit {

  public message: string;
  public title: string;
  public elementHeight: string;

  constructor(
    public dialogRef: MatDialogRef<ToastComponent>,
    protected formBuilder: FormBuilder,
    protected appController: AppController,
    protected dialog: MatDialog,
    protected renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data) {
    super(dialog, formBuilder, renderer, appController);
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
