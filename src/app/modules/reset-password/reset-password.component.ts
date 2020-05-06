import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  
  public resetForm: FormGroup;
  public hasClickSubmit: boolean = false;
  hasMobileMatches = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      new_password: new FormControl(null, Validators.required),
      verify_password: new FormControl(null, Validators.required),
    });
  }

  reset() {
    console.log('submit clicked');
  }

  public getStyle(trueValue, falseValue) {
    return this.hasMobileMatches ? trueValue : falseValue;
}

}
