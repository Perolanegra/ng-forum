import { Directive, Input, ElementRef } from '@angular/core';
import { AppController } from './appController';

@Directive({
  selector: '[ngNavNameBehavior]',

})
export class AppNavNameBehaviorDirective {
  constructor(private elRef: ElementRef, private appController: AppController) {
    this.setState();
   }

  @Input() hasEnterMenu: boolean;

  setState(): void {
    const obj = {
      setState: this.hasEnterMenu ? this.appController.setElementClass : this.appController.removeElementClass
    };
    const { setState } = obj;
    setState(this.elRef, 'div-fade-in');
  }



}
