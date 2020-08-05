import { Component, OnInit, NgZone } from '@angular/core';
import { AppController } from 'src/app/core/appController';
import { NgRichTextEditorComponent } from './ng-text-editor/ng-text-editor.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgForm } from 'src/app/core/ng-form';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'ng-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.scss'],
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
export class AddIssueComponent extends NgForm implements OnInit {

  public stateBtnSubmit = 'disabled';
  public tagList = [ 'bug', 'implementation', 'refactory' ];
  
  public getResponse() {
    throw new Error("Method not implemented.");
  }
  public submit(): void {
    throw new Error("Method not implemented.");
  }

  constructor(protected appController: AppController,
    protected formBuilder: FormBuilder,
    protected ngZone: NgZone
  ) {
    super(formBuilder, appController, ngZone, false);
  }

  ngOnInit(): void {
    this.setForm();
    this.setErrorValidation();
  }

  openRichTextEditor() {
    this.appController.showToastPopUp({ style: {} }, NgRichTextEditorComponent);
  }

  setErrorValidation(): void { // lembrando que tem que ser na ordem, type - msg
    const title_type = this.getErrorTypes(2, true);
    const title_msg = this.getErrorMessages(2, true);

    // const username_msg = this.getErrorMessages(1, true, 3);
    // const username_type = this.getErrorTypes(2, true);

    // const email_msg = [...this.getErrorMessages(0), ...this.getErrorMessages(5)];
    // const email_type = [...this.getErrorTypes(0), ...this.getErrorTypes(4)];

    // const name_msg = [ ...this.getErrorMessages(0), ...this.getErrorMessages(4), ...this.getErrorMessages(2) ];
    // const name_type = [ ...this.getErrorTypes(0), ...this.getErrorTypes(1), ...this.getErrorTypes(2) ];

    this.seErrorMsgs('title', title_type, title_msg);
    // this.seErrorMsgs('username', username_type, username_msg);
    // this.seErrorMsgs('name', name_type, name_msg);
    // this.seErrorMsgs('email', email_type, email_msg);
  }

  setForm(): void {
    this._form.addControl('title', new FormControl(null, [Validators.required]));
    this._form.addControl('subtitle', new FormControl(null, [Validators.required]));
    this._form.addControl('tags', new FormControl(null, [Validators.required]));
    this._form.addControl('contentIssue', new FormControl(null, [Validators.required]));
    this._form.addControl('contentEnquete', new FormControl(null, [Validators.required]));
    this.initStyleFormErrorMsg();
  }

}
