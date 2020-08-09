import { Component, OnInit, Renderer2, Inject, OnDestroy } from '@angular/core';
import { CKEditor4 } from 'ckeditor4-angular';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppController } from 'src/app/core/appController';
import { NgDialog } from 'src/app/core/ng-dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ng-text-editor',
  templateUrl: './ng-text-editor.component.html',
  styleUrls: ['./ng-text-editor.component.scss'],
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
    ])
  ]
})
export class NgRichTextEditorComponent extends NgDialog implements OnInit, OnDestroy {

  public model = { editorData: '' };
  public stateBtnSubmit: string = 'disabled';

  constructor(public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NgRichTextEditorComponent>,
    protected dialog: MatDialog,
    protected appController: AppController,
    protected renderer: Renderer2,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data) {
    super(dialogRef, formBuilder, appController, false);
  }

  ngOnInit(): void {
    this.setForm();
    this.setEditorData();
  }

  setForm() {
    this._form.addControl("content", new FormControl(null, [Validators.required, Validators.minLength(5)]));
  }

  setEditorData() {
    this.model.editorData = this.data?.content ? this.data.content : '<h2>Descreva seu Issue...</h2>';
  }

  ngOnDestroy() {
    this.spinner.hide();
  }

  submit(): void { // centralizar no NgDialog
    if (this._form.valid) {
      this.spinner.show();
      this.close(this._form.value.content);
    }
  }

  onChange(ev: CKEditor4.EventInfo) {
    this.stateBtnSubmit = ev.editor.getData().length < 75 ? 'disabled' : 'enabled';
    this._form.get('content').setValue(ev.editor.getData());
  }

  close(data?: any) {
    this.dialogRef.close(data);
    this.hasClosed = true;
  }

  public setErrorValidation() {
    throw new Error("Method not implemented.");
  }

  public getResponse() {
    throw new Error("Method not implemented.");
  }

}
