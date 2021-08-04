# DinamicFormInputs

npm install path-to-dinamic-form-inputs/dinamic-form-inputs-0.0.1.tgz

Import a lib no seu AppModul e declare no array de imports:

import { DinamicFormInputsModule } from "dinamic-form-inputs";

# Informações Principais


- A lib possui seletores na view para inserção de conteúdo.
- A divisão é feita da seguinte forma:

- Identifier: preHeader (Localizado antes do título do Form)
- Identifier: header (Localizado antes do Form, logo após o título)
- Identifier: bodyBeforeFooter (Localizado após o Form)
- Identifier: footerBtns (Localizado após o Body, ao final da página)

  ## Outputs

      `stateOpenChanged` <strong>Emite os seguintes parâmetros em um único objeto para manipulação do valor após select aberto</strong>
      `stateAddItem` <strong>Emite o item do control após botão de adicionar for clicado.</strong>
      `stateOnSelectedValue` <strong>Emite os seguintes parâmetros em um único objeto para manipulação do valor selecionado:</strong>
      `
      - @param item o item passado da iteração.
      - @param index o index do item passado da iteração.
      - @param selected a opção selecionada.
      - @param value o valor da opção selecionada.
      - @param hasMultiSelection Se o control for seleção múltipla retorna true.
          \*/
          `
      `stateSubmit` <strong>Emite uma cópia do form Object</strong>

  ## Inputs
  
        `hasEdit` <strong>Se o formulário será editável ou não, referência pra os campos começarem desabilitados.</strong>
        `data` <strong>Array de dados que deve ser estruturado conforme especificado.</strong>


# Sample 

# Estrutura de Dados - Inputs

> Nota: O Input `data` precisar ser tipado da seguinte forma abaixo.
