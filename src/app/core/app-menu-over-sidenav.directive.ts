import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[appAppMenuOverSideNav]'
})
export class AppMenuOverSideNavDirective {
  @Output() hasNavOpenEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {
  }
  
  @HostListener('mouseleave') onMouseLeave(eventData: Event) {
    this.hasNavOpenEmitter.emit(true);
  }


}
