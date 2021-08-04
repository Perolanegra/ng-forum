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

  #### Outputs
  
  #### Inputs
  
        `hasEdit` <strong>Se o formulário será editável ou não, referência pra os campos começarem desabilitados.</strong>
        `data` <strong>Array de dados que deve ser estruturado conforme especificado.</strong>


# Sample 

# Estrutura de Dados - Inputs

> Nota: O Input `data` precisar ser tipado da seguinte forma abaixo.
