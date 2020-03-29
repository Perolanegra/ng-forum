import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainNavComponent } from './main-nav.component';
import { MaterialModule } from '../shared/modules/material.module';

@NgModule({
  declarations: [
    MainNavComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
 
 
})
export class MainNavModule { }
