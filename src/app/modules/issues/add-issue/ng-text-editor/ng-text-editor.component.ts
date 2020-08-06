import { Component, OnInit, Renderer2, Inject, OnDestroy } from '@angular/core';
import { CKEditor4 } from 'ckeditor4-angular';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppController } from 'src/app/core/appController';
import { DialogDefault } from 'src/app/core/dialog-default';
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
export class NgRichTextEditorComponent extends DialogDefault implements OnInit, OnDestroy  {

  public model = { editorData: '<h2 id="placeholder">Descreva seu Issue...</h2>' };
  public stateBtnSubmit = 'disabled';

  constructor(public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NgRichTextEditorComponent>,
    protected dialog: MatDialog,
    protected appController: AppController,
    protected renderer: Renderer2,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data) {
    super(dialog, formBuilder, renderer, appController);
  }

  ngOnInit(): void {
    this.setDialogForm();
    this.dialogForm.addControl("content", new FormControl(null, [Validators.required, Validators.minLength(5)]));
   }

   ngOnDestroy() {
    this.spinner.hide();
   }

  submit(ev): void { // centralizar no DialogDefault
    ev.preventDefault();
    if (this.dialogForm.valid) {
      this.verifyDecision();
      this.spinner.show();
      this.close(this.dialogForm.value.content);
    }
  }

  verifyDecision() {
    // chamar um alert perguntando se ele quer confirmar criar o Issue
  }

  onChange(ev: CKEditor4.EventInfo) {
    this.stateBtnSubmit = ev.editor.getData().length < 75 ? 'disabled' : 'enabled';
    this.dialogForm.get('content').setValue(ev.editor.getData());
  }

  close(data?: any) {
    this.dialogRef.close(data);
    this.hasClosed = true;
  }

}
