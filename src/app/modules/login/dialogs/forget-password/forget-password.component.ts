import { Component, OnInit, Inject, Renderer2, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogDefault } from 'src/app/core/dialog-default';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppController } from 'src/app/core/appController';
import { Store, Select } from '@ngxs/store';
import { AuthActions } from 'src/app/state/auth/auth.actions';
import { AuthState } from 'src/app/state/auth/auth.state';
import { Observable, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'ng-reset-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent extends DialogDefault implements OnInit, OnDestroy {

  @Select(AuthState.forgotPassResponse) fPassResponse$: Observable<any>;
  private fPassResponseSubscription$: Subscription;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ForgetPasswordComponent>,
    protected dialog: MatDialog,
    protected appController: AppController,
    private store: Store,
    private spinner: NgxSpinnerService,
    protected renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data) {
    super(dialog, formBuilder, renderer, appController);
  }

  ngOnInit(): void {
    this.setDialogForm();
    this.dialogForm.addControl("username", new FormControl(null, Validators.required));
  }

  ngOnDestroy() {
    this.fPassResponseSubscription$ ?? this.fPassResponseSubscription$.unsubscribe();
  }

  getResponse() {
    this.fPassResponseSubscription$ = this.fPassResponse$.subscribe(async (data) => {
      if (data) {
        this.spinner.hide();
        this.appController.showToastPopUp(data, ToastComponent);
        this.close();
      }
    });
  }

  submit(): void { // centralizar no DialogDefault
    if (this.dialogForm.valid) {
      this.hasClickSubmit = this.dialogForm.valid;
      this.spinner.show();
      this.store.dispatch(new AuthActions.ForgotPassword(this.dialogForm.get('username').value));
      this.dialogForm.reset();
      this.getResponse();
      setTimeout(() => this.hasClickSubmit = !this.hasClickSubmit, 2000);
    }
  }

  close() {
    this.dialogRef.close();
    this.hasClosed = true;
  }

}
