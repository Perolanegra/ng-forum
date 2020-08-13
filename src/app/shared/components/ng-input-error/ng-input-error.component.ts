import { Component, Input, Output } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { BehaviorSubject } from 'rxjs';


@Component({
    selector: 'ng-input-error',
    templateUrl: './ng-input-error.component.html',
    styleUrls: ['./ng-input-error.component.scss']
})
export class NgInputErrorComponent {

    @Input() control: AbstractControl;
    @Input() controlName: string;
    @Input() errorMsgs: [];

    @Output() indexLastErrorField: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor() { }

    emitLastErrorField(index, type) {
        if(this.control.hasError(type)) {
            
            const dataResp = {
                controlName: this.controlName,
                index: index
            };
            
            this.indexLastErrorField.next(dataResp);
        }

        return 'unset';
    }
}