import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofillOff]'
})
export class AppAutofillOffDirective {
  constructor(private elRef: ElementRef) { }
  
  private _chrome = navigator.userAgent.indexOf('Chrome') > -1;

  ngOnInit() {
    if (this._chrome) {
      if (this.elRef.nativeElement.getAttribute('autocomplete') === 'off') {
        setTimeout(() => {
          this.elRef.nativeElement.setAttribute('autocomplete', 'offoff');
        });
      }
    }
  }

}
