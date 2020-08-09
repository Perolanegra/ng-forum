import { Component, OnInit, Renderer2, Inject, HostListener, ElementRef } from '@angular/core';
import { DialogDefault } from 'src/app/core/dialog-default';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppController } from 'src/app/core/appController';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';

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

  constructor(protected dialogRef: MatDialogRef<AddSurveyDialogComponent>,
    protected formBuilder: FormBuilder,
    public appController: AppController,
    protected dialog: MatDialog,
    protected renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data) {
    super(dialogRef, formBuilder, appController, false);
  }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(): void {
    this.setFormControls();
    this.setData();
  }

  setFormControls() {
    this._form.addControl("title", new FormControl('', [Validators.required, Validators.minLength(5), CustomValidators.allblank]));
    this._form.addControl("hasWhoVoted", new FormControl(false));
    this._form.addControl("hasClosingDate", new FormControl(false));
    this._form.addControl("closingDate", new FormControl(null));
    this._form.addControl("closingTime", new FormControl(null));
    this._form.addControl("question", new FormControl('', [Validators.required, Validators.minLength(8)]));
    this._form.addControl("opt1", new FormControl('', [Validators.required, Validators.minLength(2)]));
    this._form.addControl("opt2", new FormControl('', [Validators.required, Validators.minLength(2)]));
  }

  submit(): void {
    if (this._form.valid) {
      this.close(this._form.value);
    }
  }

  timepickerHasOpened() {
    setTimeout(() => {
      this.renderer.setProperty(document.querySelector('.timepicker-dial__hint'), 'innerHTML',
        `* use setas (<span>⇅</span>) para alterar a hora.`);
    }, 300);
  }

  setErrorValidation(): void { // lembrando que tem que ser na ordem, type - msg
    const title_type = this.getErrorTypes(2, true, 4);
    const title_msg = this.getErrorMessages(2, true, 5, 5);

    this.setErrorMsgs('title', title_type, title_msg);
  }

  setDateState(ev: MatCheckboxChange) {
    if (!ev.checked) {
      this._form.get('closingDate').reset();
      this._form.get('closingTime').reset();
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

  public getResponse() {
    throw new Error("Method not implemented.");
  }



}
