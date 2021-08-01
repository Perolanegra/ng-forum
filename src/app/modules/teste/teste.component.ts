import { Component, OnInit, Input } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
} from "@angular/forms";

@Component({
  selector: "ng-dev",
  templateUrl: "./teste.component.html",
  styleUrls: ["./teste.component.scss"],
})
export class TesteComponent implements OnInit {
  @Input() data: any;
  // tslint:disable-next-line: variable-name
  _form: FormGroup;

  hasEdit: boolean;

  constructor(private formBuilder: FormBuilder) {
    this._form = this.formBuilder.group({});
  }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  addItem(item) {}

  /**
   * Emite os seguintes parâmetros em um único objeto para manipulação do valor selecionado.
   * @param item o item passado da iteração.
   * @param index o index do item passado da iteração.
   * @param selected a opção selecionada.
   * @param value o valor da opção selecionada.
   * @param hasMultiSelection Se o control for seleção múltipla retorna true.
   */
  onSelectValue(item, index, selected, value, hasMultiSelection) {}

  /**
   * Emite os seguintes parâmetros em um único objeto para manipulação do valor após select aberto.
   * @param event evento recebido pelo select.
   * @param item item passado da iteração.
   */
  hasOpenedChange(event, item) {}
}
