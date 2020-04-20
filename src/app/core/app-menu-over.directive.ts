import { Directive, HostListener, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { MainNavStyle } from '../modules/main-nav/main-nav.style';

@Directive({
  selector: '[ngMenuOver]',

})
export class AppMenuOverDirective {
  constructor(private elRef: ElementRef, private mainNavStyle: MainNavStyle) { }

  @Output() hasEnterMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() hasMobileMatches: boolean;

  @HostListener('mouseenter') onMouseOver(eventData: Event): void {
    this.hasEnterMenu.emit(true);
    this.mainNavStyle.setStyleMenuNavInit(this.elRef.nativeElement, this.hasMobileMatches);
  }

  // @HostListener('mouseleave') onMouseLeave(eventData: Event): void {
  //   this.hasEnterMenu.emit(false);
  //   this.mainNavStyle.setStyleMenuClose(this.elRef.nativeElement, this.hasMobileMatches);
  // }

}
