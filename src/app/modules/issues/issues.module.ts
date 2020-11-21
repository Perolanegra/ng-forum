import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgRichTextEditorComponent } from './add-issue/ng-text-editor/ng-text-editor.component';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { ListIssueComponent } from './list-issue/list-issue.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IssuesRoutingModule } from './issues-routing.module';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule } from '@angular/forms';
import { AddSurveyDialogComponent } from './add-issue/add-survey-dialog/add-survey-dialog.component';
import { NgxsModule, NGXS_PLUGINS } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { IssueState } from '../../state/issue/issue.state';
import { IssuesService } from './issues.service';
import { IssueTagState } from '../../state/issue-tag/issue-tag.state';
import { IssueTagService } from '../../shared/services/issue-tag.service';

@NgModule({
  declarations: [
    NgRichTextEditorComponent,
    AddIssueComponent,
    ListIssueComponent,
    AddSurveyDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    IssuesRoutingModule,
    CKEditorModule,
    FormsModule,
    NgxsModule.forRoot([IssueState, IssueTagState], { developmentMode: !environment.production }),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [NgRichTextEditorComponent, AddSurveyDialogComponent],
  providers: [
    IssuesService,
    IssueTagService,
  ]
})
export class IssuesModule { }