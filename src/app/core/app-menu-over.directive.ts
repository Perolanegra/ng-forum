import { Directive, HostListener, Output, Input, ElementRef } from '@angular/core';
import { MainNavStyle } from '../modules/main-nav/main-nav.style';
import { Subject } from 'rxjs';

@Directive({
  selector: '[ngMenuOver]',

})
export class AppMenuOverDirective {
 
  
  constructor(private elRef: ElementRef, private mainNavStyle: MainNavStyle) {
    
  }

  @Output() hasEnterMenu: Subject<boolean> = new Subject<boolean>();
  @Input() hasMobileMatches: boolean;

  @HostListener('mouseenter') onMouseOver(eventData: Event): void {
    this.setStyle(true);
  }

  @HostListener('mouseleave') onMouseLeave(eventData: Event): void {
    this.setStyle(false);
  }
  
  setStyle(state: boolean): void {
    if (!this.hasMobileMatches) {
      this.hasEnterMenu.next(state);
      state ? this.mainNavStyle.setStyleMenuNavInit(this.elRef.nativeElement, this.hasMobileMatches) :
        this.mainNavStyle.setStyleMenuNavClose(this.elRef.nativeElement, this.hasMobileMatches);
    }
  }

}
