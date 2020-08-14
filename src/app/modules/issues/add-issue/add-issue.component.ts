import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, TemplateRef, Injector, ViewEncapsulation } from '@angular/core';
import { AppController } from 'src/app/core/appController';
import { NgRichTextEditorComponent } from './ng-text-editor/ng-text-editor.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgForm } from 'src/app/core/ng-form';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AddSurveyDialogComponent } from './add-survey-dialog/add-survey-dialog.component';

@Component({
  selector: 'ng-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.scss'],
  animations: [
    trigger('btnSubmitState', [
      state('disabled', style({ 'opacity': '0.4', 'pointer-events': 'none' })),
      state('enabled', style({ 'opacity': '1', 'pointer-events': 'auto', 'color': 'black' })),
      transition('disabled => enabled', animate(300)),
      transition('enabled => disabled', animate(300))
    ]),
    trigger('removeIconState', [
      state('disabled', style({ 'opacity': '0.4', 'pointer-events': 'none' })),
      state('enabled', style({ 'opacity': '1', 'pointer-events': 'auto' }))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddIssueComponent extends NgForm implements OnInit {

  public stateBtnSubmit: string = 'disabled';
  public stateIconAddContent: string = 'disabled';
  public stateIconAddSurvey: string = 'disabled';
  public tagListMock = ['bug', 'implementation', 'refactory'];
  private count = 0;

  public getResponse() {
    throw new Error("Method not implemented.");
  }

  constructor(protected appController: AppController,
    protected formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
  ) {
    super(formBuilder, appController, false);
  }

  ngOnInit(): void {
    this.setForm();
    this.setErrorValidation();
    this._form.valueChanges.pipe().subscribe(formEmitted => {
      formEmitted ? this.stateBtnSubmit = this._form.valid ? 'enabled' : 'disabled' : null;
    });
  }

  // async setimg() {
  //   await this.appController.getImg('content-issue.png');
  // }

  addContent(componentId: string) {
    const componentObj = { 1: NgRichTextEditorComponent, 2: AddSurveyDialogComponent };
    const dialogRef = this.appController.showToastPopUp({
      style: {}, value: this._form.value.contentIssue,
      count: this.count
    }, componentObj[Number(componentId)]);

    if (this.count < 1) {
      this.count++;
    }

    dialogRef.afterClosed().subscribe((data: any) => { // fechar essa subscrição
      if (componentId == '1' && data?.content) {
        this.appController.removeElementClass(document.getElementById('tagField') as any, 'disabled');
        this._form.get('contentIssue').setValue(data?.content);
        this.stateIconAddContent = this._form.value.contentIssue ? 'enabled' : 'disabled';
        return;
      }

      this._form.get('contentIssue').setValue(data);
      this.stateIconAddSurvey = this._form.value.contentIssue ? 'enabled' : 'disabled';
      this.ref.markForCheck();
      setTimeout(() => {
        console.log('contentIssue: ', this._form.value.contentIssue);
      }, 660);
    });
  }

  // switchTypeContent() {
  //   this._form.get('typeContentIssue').setValue()
  //   this.isContentIssue = !this.isContentIssue;
  // }

  public submit(): void {

  }

  setErrorValidation(): void { // lembrando que tem que ser na ordem, type - msg
    const title_type = this.getErrorTypes(2, true);
    const title_msg = this.getErrorMessages(2, true);

    const subtitle_type = this.getErrorTypes(2, true, 3);
    const subtitle_msg = this.getErrorMessages(2, true, 4, 10);

    this.setErrorMsgs('title', title_type, title_msg);
    this.setErrorMsgs('subtitle', subtitle_type, subtitle_msg);
  }

  setForm(): void {
    this._form.addControl('title', new FormControl(null, [Validators.required, CustomValidators.allblank]));
    this._form.addControl('subtitle', new FormControl(null, [Validators.required, CustomValidators.allblank]));
    this._form.addControl('tags', new FormControl(null, [Validators.required]));
    this._form.addControl('contentIssue', new FormControl(null, [Validators.required]));
    this._form.addControl('typeContentIssue', new FormControl(false));
    this.setInitControlsPadding();
  }

  confirmRemoveContent() {// chamar popup de confirmação passando dinamicamente a mensagem de pergunta e as opções.
    const title = 'Atenção';
    const message = 'Você realmente quer remover todo o conteúdo?';
    const type = 'warning';
    const style = {};
    const dialogRef = this.appController.showToastPopUp({ title, message, type, style }, ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(dataEmitted => { // desinscrever esse kra dps.
      if (dataEmitted) {
        this._form.get('contentIssue').setValue('');
        this.stateIconAddContent = 'disabled';
        this.stateIconAddSurvey = 'disabled';
        this.ref.markForCheck();
      }
    });

  }

}
