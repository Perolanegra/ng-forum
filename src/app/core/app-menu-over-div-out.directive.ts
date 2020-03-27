import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[appAppMenuOverDivOut]'
})
export class AppMenuOverDivOutDirective {
  
  @Input() hasLeaveSideNav: boolean;
  @Input() sideNav;

  @Output() hasLeaveContent: EventEmitter<Object> = new EventEmitter<Object>();

  constructor() {
  }
  
  @HostListener('mouseenter') onMouseOver(eventData: Event): void {
    if(this.hasLeaveSideNav) {
      this.sideNav.toggle();
    }
  }

  @HostListener('mouseleave') onMouseLeave(eventData: Event): void {
    const obj = {
      hasLeaveContent: true,
      hasLeaveSideNav: false
    };

    this.hasLeaveContent.emit(obj);
  }

}
