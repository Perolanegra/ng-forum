import { Component, OnInit } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class TesteComponent implements OnInit {

  public tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'SubScript', 'SuperScript', '|',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink',
      'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  };
  public iframe: object = { enable: true };
  public height: number = 800;

  public colunasConfig = [
    { nome: 'nome', titulo: 'Nome', cell: (registro: any) => `${registro.nome}` },
    { nome: 'siglaFantasia', titulo: 'Sigla Fantasia', cell: (registro: any) => `${registro.sigla}` },
    { nome: 'sigla', titulo: 'Sigla', cell: (registro: any) => `${registro.lastname}` }
  ];

  public registros = [
    { nome: 'Igor', sigla: 'IG', lastname: 'Alves' },
    { nome: 'Roberto', sigla: 'testesss', lastname: 'Alves' },
    { nome: 'Robertinha', sigla: 'teste', lastname: 'Alves' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
