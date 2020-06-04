import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss'],
})
export class TesteComponent implements OnInit {

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

  
  ngOnInit(): void {
  }

}
