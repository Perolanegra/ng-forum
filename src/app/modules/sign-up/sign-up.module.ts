import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './signup.routing.module';


@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SignUpRoutingModule
  ],
  exports: [
    SignUpComponent
  ]
})
export class SignUpModule { }
