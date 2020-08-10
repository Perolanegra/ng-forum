import { Component, OnInit, Renderer2, Inject, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
      state('disabled', style({ 'opacity': '0.4', 'pointer-events': 'none'})),
      state('enabled', style({ 'opacity': '1', 'pointer-events': 'auto', 'color': 'black' })),
      transition('disabled => enabled', animate(300)),
      transition('enabled => disabled', animate(300))
    ]),
    trigger('optContainerState', [
      state('overflowDisabled', style({ 'overflow-y': 'none' })),
      state('overflowEnabled', style({ 'overflow-y': 'scroll' })),
    ]),
    trigger('optContainerInState', [
      state('paddingDisabled', style({ 'padding-right': 'none' })),
      state('paddingEnabled', style({ 'padding-right': '10px' })),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSurveyDialogComponent extends NgDialogDefault implements OnInit {

  public containerState: string = 'overflowDisabled';
  public containerInState: string = 'paddingDisabled';

  constructor(protected dialogRef: MatDialogRef<AddSurveyDialogComponent>,
    protected formBuilder: FormBuilder,
    public appController: AppController,
    protected dialog: MatDialog,
    protected renderer: Renderer2,
    private ref: ChangeDetectorRef,
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

    ['closingDate', 'closingTime'].map((control: string) => this._form.addControl(control, new FormControl('', [Validators.required])));
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

  setData(): void {
    // const { title, message, btnYes, btnNo } = this.data.formControls;
    // this.title = title || 'Atenção';
    // this.message = message || 'Você confirma a operação a seguir?';
    // this.btnNo = btnNo || 'Não';
    // this.btnYes = btnYes || 'Sim';
  }

  onAddControl(): void {
    const formArray = this._form.get('formArrOpt') as FormArray;
    formArray.push(new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.allblank]));

    if ((document.querySelector('#opt-container') as any).offsetHeight >= 266) {
      this.containerState = 'overflowEnabled';
      this.containerInState = 'paddingEnabled';
      return;
    }

    this.containerState = 'overflowDisabled';
    this.containerInState = 'paddingDisabled';
  }

  resetControl(index: any): void {
    if ((document.querySelector('#opt-container') as any).offsetHeight <= 298) { // por esse height dinamico
      this.containerState = 'overflowDisabled';
      this.containerInState = 'paddingDisabled';
    }

    const formArray = this._form.get('formArrOpt') as FormArray;

    if (formArray.length > 2) { // Pelo menos 2 fields de resposta precisam existir
      this._form.get('formArrOpt').get(index.toString()).setErrors(null);
      formArray.controls.splice(Number(index), 1);
      return;
    }
    
    this._form.get('formArrOpt').get(index.toString()).reset();
  }

  public getResponse(): void {
    throw new Error("Method not implemented.");
  }

}
