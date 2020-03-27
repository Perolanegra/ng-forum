import { Directive, HostListener, Output, EventEmitter, Input, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAppMenuOver]'
})
export class AppMenuOverDirective {
  constructor(private renderer: Renderer2, private elRef: ElementRef) { }
  
  @HostListener('mouseenter') onMouseOver(eventData: Event): void {
    console.log('im here');
    
    this.renderer.setStyle(this.elRef.nativeElement, 'width', '275px');
  }

  // @HostListener('mouseleave') onMouseLeave(eventData: Event): void {
  //   this.renderer.setStyle(this.elRef.nativeElement, 'width', '90px');
  // }

}