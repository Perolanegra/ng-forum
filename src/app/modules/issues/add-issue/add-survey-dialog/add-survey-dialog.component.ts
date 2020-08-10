import { Component, OnInit, Renderer2, Inject, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { NgDialogDefault } from 'src/app/core/ng-dialog';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSurveyDialogComponent extends NgDialogDefault implements OnInit {

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
    this.setErrorValidation();
  }

  setFormControls() {
    this._form.addControl("title", new FormControl('', [Validators.required, Validators.minLength(5), CustomValidators.allblank]));
    this._form.addControl("hasWhoVoted", new FormControl(false));
    this._form.addControl("hasClosingDate", new FormControl(false));
    this._form.addControl("question", new FormControl('', [Validators.required, Validators.minLength(8), CustomValidators.allblank]));
    this._form.addControl('formArrOpt', new FormArray([
      new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.allblank]),
      new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.allblank])
    ]));
    this._form.get('formArrayOpts')
    this.setInitControlsPaddingFormArr('formArrOpt');
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
    const title_type = this.getErrorTypes(2, true, 3);

    const arr = [
      { requiredParam: 5, control: 'title' },
      { requiredParam: 8, control: 'question' },
      { requiredParam: 2, control: 'opt1' },
      { requiredParam: 2, control: 'opt2' }
    ];

    arr.map(val => {
      this.setErrorMsgs(val.control, title_type, this.getErrorMessages(2, true, 4, val.requiredParam));
    });

    const closingDateTime_type = this.getErrorTypes(1, true);
    const closingDateTime_msg = this.getErrorMessages(1, true);

    this.setErrorMsgs('closingDate', closingDateTime_type, closingDateTime_msg);
    this.setErrorMsgs('closingTime', closingDateTime_type, closingDateTime_msg);
  }

  setDateState(ev: MatCheckboxChange): void {
    if (!ev.checked) {
      this.appController.removeElementClass(document.querySelector('#closingDate') as any, 'enabled');
      this.appController.setElementClass(document.querySelector('#closingDate') as any, 'disabled');
      setTimeout(() => {
        this.appController.setElementClass(document.querySelector('#closingDate') as any, 'none');
        ['closingDate', 'closingTime'].map((control: string) => this._form.removeControl(control));
      }, 310);
      return;
    }

    const requiredControl = new FormControl('', [Validators.required]);
    ['closingDate', 'closingTime'].map((control: string) => this._form.addControl(control, requiredControl));
    this.resetControlPadding(['closingDate', 'closingTime']);

    this.appController.removeElementClass(document.querySelector('#closingDate') as any, 'none');
    setTimeout(() => {
      this.appController.removeElementClass(document.querySelector('#closingDate') as any, 'disabled');
      this.appController.setElementClass(document.querySelector('#closingDate') as any, 'enabled');
    }, 50);
  }


  @HostListener('window:keyup.esc') exitByESC(): void {
    !this.hasTimePicker ? this.close() : null;
  }

  setData() {
    // const { title, message, btnYes, btnNo } = this.data.formControls;
    // this.title = title || 'Atenção';
    // this.message = message || 'Você confirma a operação a seguir?';
    // this.btnNo = btnNo || 'Não';
    // this.btnYes = btnYes || 'Sim';
  }

  onAddControl() {
    const formArray = this._form.get('formArrayOpts') as FormArray;
    formArray.push(new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.allblank]))
  }

  public getResponse() {
    throw new Error("Method not implemented.");
  }

}
