import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditor, IFrameSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'ng-text-editor',
  templateUrl: './ng-text-editor.component.html',
  styleUrls: ['./ng-text-editor.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class NgRichTextEditorComponent implements OnInit {

  @ViewChild('defaultRTE') editor: RichTextEditor;

  constructor() { }

  public iframe: IFrameSettingsModel = {
    enable: true,
    resources: {
      styles: ['width="1280"', 'height="629"']
    }
  };

  public tools: object = {
    type: 'MultiRow',
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'SubScript', 'SuperScript', '|',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink',
      'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  };
  public height: number = 300;

  public quickTools: object = {
    image: [
      'Replace', 'Align', 'Caption', 'Remove', 
      'InsertLink', '-', 'Display', 'AltText', 'Dimension']
  };

  ngOnInit(): void { }

}
