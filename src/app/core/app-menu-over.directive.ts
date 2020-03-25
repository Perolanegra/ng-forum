import { Directive, HostListener, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appAppMenuOver]'
})
export class AppMenuOverDirective {

  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // this.ChangeBgColor('red');
  }
  
  @HostListener('mouseover') onMouseOver() {
    this.toggle.emit(true);
    // this.renderer.setElementStyle(this.el.nativeElement, 'color', color);
  }

}
