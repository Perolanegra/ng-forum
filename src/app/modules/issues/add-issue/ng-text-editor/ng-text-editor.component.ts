import { Component, OnInit, Renderer2, Inject, OnDestroy, HostListener } from '@angular/core';
import { CKEditor4 } from 'ckeditor4-angular';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppController } from 'src/app/core/appController';
import { NgDialogDefault } from 'src/app/core/ng-dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { BtnSubmitState } from '../../../../animations/btnSubmitState';

@Component({
  selector: 'ng-text-editor',
  templateUrl: './ng-text-editor.component.html',
  styleUrls: ['./ng-text-editor.component.scss'],
  animations: [trigger('btnSubmitState', BtnSubmitState)]
})
export class NgRichTextEditorComponent extends NgDialogDefault implements OnInit, OnDestroy {

  public model = { editorData: '' };

  constructor(public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NgRichTextEditorComponent>,
    protected dialog: MatDialog,
    protected appController: AppController,
    protected spinner: NgxSpinnerService,
    protected renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data) {
    super(dialogRef, formBuilder, appController, false);
  }

  ngOnInit(): void {
    this.setForm();
    this.setComponentState();
  }

  setForm() {
    this._form.addControl("content", new FormControl(null, [Validators.required, Validators.minLength(5)]));
    this._form.addControl("enableNotifications", new FormControl(this.data.value?.enableNotifications));
  }

  setComponentState() {
    this.appController.setElementStyle(document.querySelector('.mat-dialog-container'), 'background', 'unset');
    this.appController.setElementStyle(document.querySelector('.mat-dialog-container'), 'box-shadow', 'unset');

    if (!this.hasMobileMatches) {
      this.appController.setElementStyle(document.querySelector('.mat-slide-toggle'), 'height', '22px');
    }

    if (this.data.value?.content) {
      this.model.editorData = this.data.value?.content;
      return;
    }

    this.model.editorData = '<h2>Descreva seu Issue...</h2>';
    if (!this.data?.count) this.showEditLoader(850);
  }

  ngOnDestroy() {
    this.spinner.hide();
  }

  public onCheckChange = (checked: boolean) => {
    this._form.get('enableNotifications').setValue(checked);
    this._form.get('content').setValue(this.model.editorData);
    this.setStateBtnSubmit(this.textEditorValid(this.model.editorData));
  }

  onTextEditorKeyup(ev: CKEditor4.EventInfo) {
    this._form.get('content').setValue(ev.editor.getData());
    this.setStateBtnSubmit(this.data.value?.content ? true : this.textEditorValid(ev.editor.getData()));
  }

  /**
   * @param value O parametro representa o conteúdo do TextEditor, o qual está sendo passado dinâmicamente, 
   * pelo fato de estar sendo recuperado de duas formas.
   */
  public textEditorValid(value: string): boolean {
    return value.length >= 75;
  }

  public setErrorValidation() {
    throw new Error("Method not implemented.");
  }

  public getResponse() {
    throw new Error("Method not implemented.");
  }

  @HostListener('window:keyup.esc') exitByESC(): void {
    this.close();
  }

}
