import { Component, Input, AfterContentInit } from "@angular/core";
import { AbstractControl } from "@angular/forms";


@Component({
    selector: 'ng-input-error',
    templateUrl: './ng-input-error.component.html',
    styleUrls: ['./ng-input-error.component.scss']
})
export class NgInputErrorComponent {
    
    @Input() control: AbstractControl;
    @Input() errorMsgs: [];
    
    constructor() {}
    
    
}