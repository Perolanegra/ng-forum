import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[appAppMenuOver]'
})
export class AppMenuOverDirective {
  @Input() sideNav;
  // @Output() toggleMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }
  
  @HostListener('mouseover') onMouseOver(eventData: Event) {
    this.sideNav.toggle();
  }

  // @HostListener('mouseleave') onMouseLeave(eventData: Event) {
  //   this.sideNav.toggle();
  // }

}
