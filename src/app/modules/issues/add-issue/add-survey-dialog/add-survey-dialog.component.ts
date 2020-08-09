import { Component, OnInit, Renderer2, Inject, HostListener } from '@angular/core';
import { DialogDefault } from 'src/app/core/dialog-default';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppController } from 'src/app/core/appController';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-survey-dialog',
  templateUrl: './add-survey-dialog.component.html',
  styleUrls: ['./add-survey-dialog.component.scss'],
  animations: [
    trigger('btnSubmitState', [
      state('disabled', style({
        'opacity': '0.4',
        'pointer-events': 'none'
      })),
      state('enabled', style({
        'opacity': '1',
        'pointer-events': 'auto',
        'color': 'black'
      })),
      transition('disabled => enabled', animate(300)),
      transition('enabled => disabled', animate(300))
    ]),
  ]
})
export class AddSurveyDialogComponent extends DialogDefault implements OnInit {
  public stateBtnSubmit: string = 'disabled';
  public hasTimePicker: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddSurveyDialogComponent>,
    protected formBuilder: FormBuilder,
    public appController: AppController,
    protected dialog: MatDialog,
    protected renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data) {
    super(dialog, formBuilder, renderer, appController);
  }

  ngOnInit(): void {
    this.setDialogForm();
    this.setFormControls();
    this.setData();
  }

  setFormControls() {
    this.dialogForm.addControl("title", new FormControl('', [Validators.required, Validators.minLength(5)]));
    this.dialogForm.addControl("hasWhoVoted", new FormControl(false));
    this.dialogForm.addControl("hasClosingDate", new FormControl(false));
    this.dialogForm.addControl("closingDate", new FormControl(null));
    this.dialogForm.addControl("closingTime", new FormControl(null));
    this.dialogForm.addControl("question", new FormControl('', [Validators.required, Validators.minLength(8)]));
    this.dialogForm.addControl("opt1", new FormControl('', [Validators.required, Validators.minLength(2)]));
    this.dialogForm.addControl("opt2", new FormControl('', [Validators.required, Validators.minLength(2)]));
  }

  submit(ev: any): void { // centralizar no DialogDefault
    ev.preventDefault();
    if (this.dialogForm.valid) {
      this.close(this.dialogForm.value);
    }
  }

  timepickerHasOpened() {
    setTimeout(() => {
      this.renderer.setProperty(document.querySelector('.timepicker-dial__hint'), 'innerHTML',
        `* use setas (<span>⇅</span>) para alterar a hora.`);
    }, 300);
  }

  setDateState(ev: MatCheckboxChange) {
    if (!ev.checked) {
      this.dialogForm.get('closingDate').reset();
      this.dialogForm.get('closingTime').reset();
      this.appController.removeElementClass(document.querySelector('#closingDate') as any, 'enabled');
      this.appController.setElementClass(document.querySelector('#closingDate') as any, 'disabled');
      setTimeout(() => {
        this.appController.setElementClass(document.querySelector('#closingDate') as any, 'none');
      }, 320);
      return;
    }

    this.appController.removeElementClass(document.querySelector('#closingDate') as any, 'none');
    setTimeout(() => {
      this.appController.removeElementClass(document.querySelector('#closingDate') as any, 'disabled');
      this.appController.setElementClass(document.querySelector('#closingDate') as any, 'enabled');
    }, 50);

  }

  setData() {
    // const { title, message, btnYes, btnNo } = this.data.formControls;
    // this.title = title || 'Atenção';
    // this.message = message || 'Você confirma a operação a seguir?';
    // this.btnNo = btnNo || 'Não';
    // this.btnYes = btnYes || 'Sim';
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    !this.hasTimePicker ? this.close() : null;
  }

  close(data?: any) {
    this.dialogRef.close(data);
    this.hasClosed = true;
  }

}
