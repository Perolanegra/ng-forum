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
    @Input() errorMsgs: [];

    @Output() indexLastErrorField: BehaviorSubject<boolean> = new BehaviorSubject(null);

    constructor() { }

    emitLastErrorField(index) {
        this.indexLastErrorField.next(index);
        return 'unset';
    }
}