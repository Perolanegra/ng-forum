import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgRichTextEditorComponent } from './add-issue/ng-text-editor/ng-text-editor.component';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { ListIssueComponent } from './list-issue/list-issue.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IssuesRoutingModule } from './issues-routing.module';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NgRichTextEditorComponent,
    AddIssueComponent,
    ListIssueComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    IssuesRoutingModule,
    CKEditorModule,
    FormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [NgRichTextEditorComponent]
})
export class IssuesModule { }
