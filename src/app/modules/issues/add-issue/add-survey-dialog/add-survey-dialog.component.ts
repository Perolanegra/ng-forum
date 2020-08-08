import { Component, OnInit, Renderer2, Inject, HostListener } from '@angular/core';
import { DialogDefault } from 'src/app/core/dialog-default';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppController } from 'src/app/core/appController';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-add-survey-dialog',
  templateUrl: './add-survey-dialog.component.html',
  styleUrls: ['./add-survey-dialog.component.scss'],
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
export class AddSurveyDialogComponent extends DialogDefault implements OnInit {
  public stateBtnSubmit: string = 'disabled';

  constructor(public dialogRef: MatDialogRef<AddSurveyDialogComponent>,
    protected formBuilder: FormBuilder,
    public appController: AppController,
    protected dialog: MatDialog,
    protected renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data) {
    super(dialog, formBuilder, renderer, appController);
  }
  teste;
  ngOnInit(): void {
    this.setDialogForm();
    this.setFormControls();
    this.setData();
  }

  public maskHour(value: string): void {
    // this.teste = value?.length >= 2 ? value.substr(0, 2).concat(':'.concat(value.substr(2))) : value;
  }

  setFormControls() {
    this.dialogForm.addControl("title", new FormControl(null, [Validators.required, Validators.minLength(5)]));
    this.dialogForm.addControl("hasWhoVoted", new FormControl(null));
    this.dialogForm.addControl("hasClosingDate", new FormControl(null));
    this.dialogForm.addControl("closingDate", new FormControl(null));
    this.dialogForm.addControl("filterHour", new FormControl(null));
    this.dialogForm.addControl("question", new FormControl(null, [Validators.required, Validators.minLength(8)]));
    this.dialogForm.addControl("opt1", new FormControl(null, [Validators.required, Validators.minLength(2)]));
    this.dialogForm.addControl("opt2", new FormControl(null, [Validators.required, Validators.minLength(2)]));
  }

  submit(ev: any): void { // centralizar no DialogDefault
    ev.preventDefault();
    if (this.dialogForm.valid) {
      this.close(this.dialogForm.value);
    }
  }

  setData() {
    // const { title, message, btnYes, btnNo } = this.data.formControls;
    // this.title = title || 'Atenção';
    // this.message = message || 'Você confirma a operação a seguir?';
    // this.btnNo = btnNo || 'Não';
    // this.btnYes = btnYes || 'Sim';
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.close();
  }

  close(data?: any) {
    this.dialogRef.close(data);
    this.hasClosed = true;
  }

}
