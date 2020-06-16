import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss'],
})
export class TesteComponent implements OnInit {
  widthset = '20px';
  public colunasConfig = [
    { nome: 'issues', titulo: 'Issues', cell: (registro: any) => `<div style="cursor:pointer; width: fit-content;">${registro.nome}</div>`, classes: ['make-gold'] },
    { nome: 'post', titulo: 'Post', cell: (registro: any) => `${registro.sigla}`, classes: ['info-col'] },
    { nome: 'stars', titulo: 'Stars', cell: (registro: any) => `${registro.lastname}`, classes: ['stars-col'] },
    { nome: 'views', titulo: 'Views', cell: (registro: any) => `${registro.lastname}`, classes: ['views-col'] },
    { nome: 'info', titulo: 'Info', cell: (registro: any) => `${registro.lastname}`, classes: ['post-col'] }, 
    // author, pic author, dateTime Issue created
  ];

  public registros = [
    { nome: 'Igor', sigla: 'IG', lastname: 'Alves', lastRow: false},
    { nome: 'Roberto', sigla: 'testesss', lastname: 'Alves', lastRow: false},
    { nome: 'Robertinha', sigla: 'teste', lastname: 'Alves', lastRow: true },
  ];

  
  ngOnInit(): void {
  }

}
