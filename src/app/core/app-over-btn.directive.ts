import { Directive, HostListener, Renderer2, ElementRef, Input } from '@angular/core';
import { AppController } from './appController';

@Directive({
  selector: '[ngOverBtn]'
})
export class AppOverBtnDirective {

  constructor(private renderer: Renderer2, public elfRef: ElementRef, public appController: AppController) { }
  @Input() type?: string;
  @Input() hoverColor?: string;

  @HostListener('mouseover') onMouseOver(eventData: Event): void {
    if (this.type)
      this.renderer.setStyle(this.elfRef.nativeElement, 'color', this.appController.getColorRef(this.type));
    else
      this.renderer.setStyle(this.elfRef.nativeElement, 'color', this.hoverColor);
  }

  @HostListener('mouseleave') onMouseLeave(eventData: Event): void {
    if (this.type)
      this.renderer.setStyle(this.elfRef.nativeElement, 'color', '#fff');
  }

}
