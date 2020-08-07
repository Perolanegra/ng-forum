import { Directive, HostListener, Renderer2, ElementRef, Input } from '@angular/core';
import { AppController } from './appController';

@Directive({
  selector: '[ngOverBtn]'
})
export class AppOverBtnDirective {

  constructor(private renderer: Renderer2, public elfRef: ElementRef, public appController: AppController) { }
  @Input() type: string;

  @HostListener('mouseover') onMouseOver(eventData: Event): void {
    this.renderer.setStyle(this.elfRef.nativeElement, 'color', '#E91E63');
  }

  @HostListener('mouseleave') onMouseLeave(eventData: Event): void {
    this.renderer.setStyle(this.elfRef.nativeElement, 'color', this.appController.getColorRef(this.type));
  }


}
