import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogDefault } from 'src/app/core/dialog-default';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppController } from 'src/app/core/appController';

@Component({
  selector: 'ng-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ForgetPasswordComponent extends DialogDefault implements OnInit { 
  
  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ForgetPasswordComponent>,
    protected dialog: MatDialog,
    protected appController: AppController,
    protected renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data) {
    super(dialog, formBuilder, renderer, appController);
  }

  ngOnInit(): void {
    this.setDialogForm();
    this.dialogForm.addControl("username", new FormControl(null, Validators.required));
  }

  reset() {
    if(this.dialogForm.valid) {
      console.log('aqui eh meu ng submit');
    }
  }


}
