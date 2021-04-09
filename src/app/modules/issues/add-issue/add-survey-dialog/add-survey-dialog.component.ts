import { Component, OnInit, Renderer2, Inject, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { NgDialogDefault } from 'src/app/core/ng-dialog';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { AppController } from 'src/app/core/appController';
import { trigger } from '@angular/animations';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { BtnSubmitState } from 'src/app/animations/btnSubmitState';
import { SurveyAnswersContainerState } from 'src/app/animations/surveyAnswersContainerState';

@Component({
  selector: 'app-add-survey-dialog',
  templateUrl: './add-survey-dialog.component.html',
  styleUrls: ['./add-survey-dialog.component.scss'],
  animations: [
    trigger('btnSubmitState', BtnSubmitState),
    trigger('surveyAnswersContainerState', SurveyAnswersContainerState),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSurveyDialogComponent extends NgDialogDefault implements OnInit {
  public stateAnswersContainer: string = 'overflowDisabled';

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
    this.setComponentState();
    this.setErrorValidation();
  }

  setFormControls(): void {
    this._form.addControl("title", new FormControl('', [Validators.required, Validators.minLength(5), CustomValidators.allblank]));
    this._form.addControl("displayWhoVoted", new FormControl(false));
    this._form.addControl("hasClosingDate", new FormControl(false));
    this._form.addControl("hasMultipleChoice", new FormControl(false));
    this._form.addControl("question", new FormControl('', [Validators.required, Validators.minLength(8), CustomValidators.allblank]));
    this._form.addControl('formArrOpt', new FormArray([
      new FormControl('', [Validators.required]),
      new FormControl('', [Validators.required])
    ]));
    this.setInitControlsPaddingFormArr('formArrOpt');
    const opt_type = this.getErrorTypes(1, true);
    ['0', '1'].map(item => this.setErrorMsgs(item, opt_type, this.getErrorMessages(1, true)));
  }

  timepickerHasOpened(): void {
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

  setDateState(isChecked: boolean): void {
    if (!isChecked) {
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

  beforeSubmit(): void {
    const { hasClosingDate, ...payload } = this._form.value;
    this.submit(null, payload);
  }

  setComponentState(): void {
    if (!this.hasMobileMatches) {
      this.appController.setElementStyle(document.querySelector('.cdk-global-overlay-wrapper'), 'background-color', '#22262e');
      this.appController.setElementStyle(document.querySelector('.mat-dialog-container'), 'box-shadow', 'none');
    }

    if (this.data.value) {
      this.data.value.formArrOpt.map((opt, index) => index > 1 ? this.onAddControl() : null);
      Promise.resolve(null).then(() => {
        this.setDateState(this.data.value.hasClosingDate);
        this._form.patchValue(this.data.value);
      });
    }
  }

  onAddControl(): void {
    const formArray = this._form.get('formArrOpt') as FormArray;
    formArray.push(new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.allblank]));

    const opt_type = this.getErrorTypes(1, true);
    this.setErrorMsgs((formArray.length - 1).toString(), opt_type, this.getErrorMessages(1, true));

    if (formArray.length > 2) {
      this.setPaddingContainerState(true);
      return;
    }

    this.setPaddingContainerState(false);
  }

  resetControl(index: any): void {
    const formArray = this._form.get('formArrOpt') as FormArray;

    if (formArray.length > 2) { // Pelo menos 2 fields de resposta precisam existir
      if (formArray.length === 3) this.setPaddingContainerState(false);
      formArray.controls.splice(index, 1);
      this._form.get('formArrOpt').patchValue(formArray.value);
      return;
    }

    this.setPaddingContainerState(false);
    this._form.get('formArrOpt').get(index.toString()).reset();
    return;
  }

  setPaddingContainerState = (isEnabled: boolean) => this.stateAnswersContainer = isEnabled ? 'overflowEnabled' : 'overflowDisabled';

  public getResponse(): void {
    throw new Error("Method not implemented.");
  }

  public fillForm() {
    throw new Error("Method not implemented.");
  }

}
