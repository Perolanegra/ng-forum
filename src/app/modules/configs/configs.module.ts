import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigsComponent } from './configs.component';
import { ConfigsRoutingModule } from './configs-routing.module';


@NgModule({
  declarations: [ConfigsComponent],
  imports: [
    CommonModule,
    ConfigsRoutingModule,
  ],
  exports: [
    ConfigsComponent
  ]
})
export class ConfigsModule { }
