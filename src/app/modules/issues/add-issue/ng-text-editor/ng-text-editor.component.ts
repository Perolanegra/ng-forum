import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { CKEditor4 } from 'ckeditor4-angular';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppController } from 'src/app/core/appController';
import { Store } from '@ngxs/store';
import { DialogDefault } from 'src/app/core/dialog-default';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
export class NgRichTextEditorComponent extends DialogDefault implements OnInit  {

  public model = { editorData: '<h2 id="placeholder">Descreva seu Issue...</h2>' };
  public stateBtnSubmit = 'disabled';

  constructor(public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NgRichTextEditorComponent>,
    protected dialog: MatDialog,
    protected appController: AppController,
    private store: Store,
    protected renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data) {
    super(dialog, formBuilder, renderer, appController);
  }

  ngOnInit(): void {
    this.setDialogForm();
    this.dialogForm.addControl("content", new FormControl(null, [Validators.required, Validators.minLength(5)]));
   }

  submit(): void { // centralizar no DialogDefault
    if (this.dialogForm.valid) {
      this.verifyDecision();
      // this.spinner.show();
      // this.store.dispatch(new AuthActions.ForgotPassword(this.dialogForm.get('username').value));
    }
  }

  verifyDecision() {
    // chamar um alert perguntando se ele quer confirmar criar o Issue
  }

  onChange(ev: CKEditor4.EventInfo) {
    this.stateBtnSubmit = ev.editor.getData().length < 75 ? 'disabled' : 'enabled';
    this.dialogForm.get('content').setValue(ev.editor.getData());
  }

  close() {
    this.dialogRef.close();
    this.hasClosed = true;
  }

}
