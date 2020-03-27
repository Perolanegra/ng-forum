import { Directive, HostListener, Output, EventEmitter, Input, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAppMenuOver]'
})
export class AppMenuOverDirective {
  @Input() sideNav;
  @Input() hasLeaveSideNav: boolean;
  @Input() hasLeaveContent: boolean;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
  }
  
  @HostListener('mouseenter') onMouseOver(eventData: Event): void {
    if(!this.hasLeaveSideNav && this.hasLeaveContent) {
      this.sideNav.toggle();
      this.renderer.setStyle(this.elRef.nativeElement, 'z-index', '2 !important');
    }
  }

}
