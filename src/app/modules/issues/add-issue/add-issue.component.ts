import { Component, OnInit, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { AppController } from 'src/app/core/appController';
import { NgRichTextEditorComponent } from './ng-text-editor/ng-text-editor.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgForm } from 'src/app/core/ng-form';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { NgxSpinnerService } from 'ngx-spinner';

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
    ]),
    
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddIssueComponent extends NgForm implements OnInit {

  public stateBtnSubmit: string = 'disabled';
  public tagListMock = [ 'bug', 'implementation', 'refactory' ];
  private count = 0;
  public hasContent = false;
  
  public getResponse() {
    throw new Error("Method not implemented.");
  }
  public submit(): void {
    throw new Error("Method not implemented.");
  }

  constructor(protected appController: AppController,
    protected formBuilder: FormBuilder,
    protected ngZone: NgZone,
    private spinner: NgxSpinnerService,
  ) {
    super(formBuilder, appController, ngZone, false);
  }

  ngOnInit(): void {
    this.setForm();
    this.setErrorValidation();
    this._form.valueChanges.pipe().subscribe(formEmitted => {
      formEmitted ? this.stateBtnSubmit = this._form.valid ? 'enabled' : 'disabled' : null;
    })
  }

  openRichTextEditor(ev) {
    ev.preventDefault();
    const dialogRef = this.appController.showToastPopUp({ style: {} }, NgRichTextEditorComponent);
    if(this.count < 1) {
      this.spinner.show();
      dialogRef.afterOpened().subscribe(() => setTimeout(() => this.spinner.hide(), 600));
      this.count++;
    }
    dialogRef.afterClosed().subscribe(content => {
      if(content) {
        this.appController.removeElementClass(document.getElementById('tagField') as any, 'disabled');
        this._form.get('contentIssue').setValue(content);
      }
    });
  }

  setErrorValidation(): void { // lembrando que tem que ser na ordem, type - msg
    const title_type = this.getErrorTypes(2, true);
    const title_msg = this.getErrorMessages(2, true);

    const subtitle_type = this.getErrorTypes(2, true, 3);
    const subtitle_msg = this.getErrorMessages(2, true, 4, 10);

    this.seErrorMsgs('title', title_type, title_msg);
    this.seErrorMsgs('subtitle', subtitle_type, subtitle_msg);
  }

  setForm(): void {
    this._form.addControl('title', new FormControl(null, [Validators.required, CustomValidators.allblank]));
    this._form.addControl('subtitle', new FormControl(null, [Validators.required, CustomValidators.allblank]));
    this._form.addControl('tags', new FormControl(null, [Validators.required]));
    this._form.addControl('contentIssue', new FormControl(null, [Validators.required]));
    this.initStyleFormErrorMsg();
  }

}
