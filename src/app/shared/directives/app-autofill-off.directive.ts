import { Directive, ElementRef, NgZone } from '@angular/core';

@Directive({
  selector: '[ngAutofillOff]'
})
export class AppAutofillOffDirective {
  constructor(private elRef: ElementRef, private ngZone: NgZone) { }

  private _chrome = navigator.userAgent.indexOf('Chrome') > -1;

  ngOnInit() {
    if (this._chrome) {
      if (this.elRef.nativeElement.getAttribute('autocomplete') === 'on') {
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            this.elRef.nativeElement.setAttribute('autocomplete', 'off');
          });
        });
      }
    }
  }

}
