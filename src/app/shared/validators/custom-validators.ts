
import { ValidationErrors, FormControl } from '@angular/forms';

export class CustomValidators {

    static cpf(pControl: FormControl): ValidationErrors {
        if (pControl.value != undefined && pControl.value != null && pControl.value.toString() != '') {

            if (!pControl.value.match("^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}\\-[0-9]{2}$")
                && !pControl.value.match("^[0-9]{11}$")) {
                return { cpf: true };
            }
        }

        return null;
    }

    static whitespace(pControl: FormControl): ValidationErrors {
        const inValid = new RegExp('^[_A-z0-9]{1,}$');
        const hasWhiteSpace = inValid.test(pControl.value);

        if(hasWhiteSpace) {
            return null;
        }

        return { whitespace: true };
    }


    static cnpj(pControl: FormControl): ValidationErrors {
        if (pControl.value != undefined && pControl.value != null && pControl.value.toString() != '') {
            if (!pControl.value.match("^[0-9]{2}\\.[0-9]{3}\\.[0-9]{3}\\/[0-9]{4}\\-[0-9]{2}$")
                && !pControl.value.match("^[0-9]{14}$")) {
                return { cnpj: true };
            }
        }

        return null;
    }

    static cep(pControl: FormControl): ValidationErrors {

        if (pControl.value != undefined && pControl.value != null && pControl.value.toString() != '') {
            if (!pControl.value.match("^[0-9]{2}\\.[0-9]{3}\\-[0-9]{3}$")
                && !pControl.value.match("^[0-9]{8}$")) {
                return { cep: true };
            }
        }

        return null;
    }

    static phone(pControl: FormControl): ValidationErrors {

        if (pControl.value != undefined && pControl.value != null && pControl.value.toString() != '') {
            if (!pControl.value.match("^\\([0-9]{2}\\)\\s[0-9]{4,5}\\-[0-9]{4}$")) {
                return { telefone: true };
            }
        }

        return null;
    }


}