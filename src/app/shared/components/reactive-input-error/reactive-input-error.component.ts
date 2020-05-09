import { Component, Input } from "@angular/core";
import { AbstractControl } from "@angular/forms";


@Component({
    selector: 'ng-input-error',
    templateUrl: './reactive-input-error.component.html',
    styleUrls: ['./reactive-input-error.component.scss']
})
export class ReactiveInputErrorComponent {
    
    @Input() control: AbstractControl;
    @Input() errorMsgs: [];
    
    constructor() {}

    
}