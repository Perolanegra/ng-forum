import { Component, OnInit, Renderer2, Inject, OnDestroy } from '@angular/core';
import { CKEditor4 } from 'ckeditor4-angular';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppController } from 'src/app/core/appController';
import { NgDialogDefault } from 'src/app/core/ng-dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ng-text-editor',
  templateUrl: './ng-text-editor.component.html',
  styleUrls: ['./ng-text-editor.component.scss'],
  animations: [
    trigger('btnSubmitState', [
      state('disabled', style({ 'opacity': '0.4', 'pointer-events': 'none' })),
      state('enabled', style({ 'opacity': '1', 'pointer-events': 'auto', 'color': 'black' })),
      transition('disabled => enabled', animate(300)),
      transition('enabled => disabled', animate(300))
    ])
  ]
})
export class NgRichTextEditorComponent extends NgDialogDefault implements OnInit, OnDestroy {

  public model = { editorData: '' };
  public stateBtnSubmit: string = 'disabled';

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
    this.appController.setElementStyle(document.querySelector('.mat-dialog-container'), 'background', 'unset');
  }

  setForm() {
    this._form.addControl("content", new FormControl(null, [Validators.required, Validators.minLength(5)]));
  }

  setComponentState() {
    if(this.data?.value) {
      this.model.editorData = this.data.value;
      return;
    }

    this.model.editorData = '<h2>Descreva seu Issue...</h2>';
    if(!this.data?.count) this.showEditLoader(850);
  }

  ngOnDestroy() {
    this.spinner.hide();
  }

  onChange(ev: CKEditor4.EventInfo) {
    this.stateBtnSubmit = ev.editor.getData().length < 75 ? 'disabled' : 'enabled';
    this._form.get('content').setValue(ev.editor.getData());
  }

  public setErrorValidation() {
    throw new Error("Method not implemented.");
  }

  public getResponse() {
    throw new Error("Method not implemented.");
  }

}
