import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
  } from "@angular/core";
  import {
    FormGroup,
    FormBuilder,
    FormControl,
    Validators,
  } from "@angular/forms";
  /**
   * A lib possui seletores na view para inserção de conteúdo.
   *
   *  A divisão é feita da seguinte forma:
   *
   * Identifier: preHeader (Localizado antes do título do Form)
   *
   * Identifier: header (Localizado antes do Form, logo após o título)
   *
   * Identifier: bodyBeforeFooter (Localizado após o Form)
   *
   * Identifier: footerBtns (Localizado após o Body, ao final da página)
   */
  @Component({
    selector: "lib-dinamic-form",
    templateUrl: "./dinamic-form.component.html",
    styleUrls: ["./dinamic-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class DinamicFormComponent implements OnInit {
    @Input() data: any;
    // tslint:disable-next-line: variable-name
    protected _form: FormGroup;
  
    @Input() hasEdit: boolean;
    @Output() stateOpenChanged: EventEmitter<any> = new EventEmitter();
    @Output() stateAddItem: EventEmitter<any> = new EventEmitter();
    @Output() stateOnSelectedValue: EventEmitter<any> = new EventEmitter();
    @Output() stateSubmit: EventEmitter<any> = new EventEmitter();
  
    constructor(private formBuilder: FormBuilder) {
      this._form = this.formBuilder.group({});
    }
  
    ngOnInit(): void {
      this.setComponentState();
    }
  
    setComponentState(): void {
      this.addControlData();
    }
  
    addControlData(): void {
      (this.data.fields as Array<any>).forEach((field: any) => {
        this._form.addControl(
          field.formControlName,
          new FormControl(
            {
              value: field.type === "select" && field.hasMulti ? [] : "",
              disabled: field.type === "date",
            },
            Validators.required
          )
        );
      });
      this.data.hasSearch
        ? this._form.addControl("searchWord", new FormControl(null))
        : "";
    }
  
    /**
     * Método responsável por manipular o estado do control após botão de adicionar for clicado.
     * @param item item que será capturado e emitido para o seu componente toda vez que o botão + for disparado.
     */
    addItem(item): void {
      this.stateAddItem.emit({ item });
    }
  
    /**
     * Emite os seguintes parâmetros em um único objeto para manipulação do valor selecionado.
     * @param item o item passado da iteração.
     * @param index o index do item passado da iteração.
     * @param selected a opção selecionada.
     * @param value o valor da opção selecionada.
     * @param hasMultiSelection Se o control for seleção múltipla retorna true.
     */
    onSelectValue(item, index, selected, value, hasMultiSelection): void {
      this.stateOnSelectedValue.emit({
        item,
        index,
        selected,
        value,
        hasMultiSelection,
      });
    }
  
    /**
     * Emite os seguintes parâmetros em um único objeto para manipulação do valor após select aberto.
     * @param event evento recebido pelo select.
     * @param item item passado da iteração.
     */
    hasOpenedChange(event, item): void {
      this.stateOpenChanged.emit({ event, item });
    }
  
    submit(): void {
      this.stateSubmit.emit(JSON.parse(JSON.stringify(this._form.value)));
    }
  
    get formControls(): any {
      return this._form.controls;
    }
  
    get form(): any {
      return this._form;
    }
  }
  
  