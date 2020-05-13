
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
        if(pControl.value != undefined && pControl.value != null && pControl.value.toString() != '') {
            if(pControl.value.indexOf(' ') >= 0) { // Tem espaço em branco se entrar
                return { whitespace: true };
            }
        }

        return null;
    }

    static allblank(pControl: FormControl): ValidationErrors {
        if(pControl.value != undefined && pControl.value != null && pControl.value.toString() != '') {
            if(!pControl.value.trim()) { // é tudo espaço em branco se entrar
                return { allblank: true };
            }
        }

        return null;
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