import { Directive, HostListener, Output, EventEmitter, Input, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMenuOver]',
 
})
export class AppMenuOverDirective {
  constructor(private renderer: Renderer2, private elRef: ElementRef) { }
  
  @HostListener('mouseenter') onMouseOver(eventData: Event): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'width', '296px');
    const nativeElement: HTMLElement = this.elRef.nativeElement;
   

    this.renderer.setStyle(nativeElement.querySelector('.div-img-background'), 'width', '120px');
    this.renderer.setStyle(nativeElement.querySelector('.div-img-background'), 'height', '119px');


    this.renderer.setStyle(nativeElement.querySelector('.div-img-center-above'), 'height', '250px');

    this.renderer.setStyle(nativeElement.querySelector('.img-logo-menu'), 'max-width', '130px');
    

    this.renderer.setStyle(nativeElement.querySelector('.div-img-center'), 'bottom', '17vh');

    this.renderer.setStyle(nativeElement.querySelector('#sideNav'), 'overflow', 'hidden auto');


    this.renderer.setStyle(nativeElement.querySelector('.img-menu-over'), 'max-width', '100px');
    this.renderer.setStyle(nativeElement.querySelector('.img-menu-over'), 'max-height', '99px');
 
  }

  @HostListener('mouseleave') onMouseLeave(eventData: Event): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'width', '90px');
    const nativeElement: HTMLElement = this.elRef.nativeElement;

    this.renderer.setStyle(nativeElement.querySelector('#sideNav'), 'overflow', 'hidden');
    
    this.renderer.setStyle(nativeElement.querySelector('.div-img-background'), 'width', '66px');
    this.renderer.setStyle(nativeElement.querySelector('.div-img-background'), 'margin-top', '15%');
    this.renderer.setStyle(nativeElement.querySelector('.div-img-background'), 'height', '65px');

    this.renderer.setStyle(nativeElement.querySelector('.div-img-center-above'), 'height', '200px');

    this.renderer.setStyle(nativeElement.querySelector('.img-logo-menu'), 'max-width', '90px');

    this.renderer.setStyle(nativeElement.querySelector('.div-img-center'), 'bottom', '9vh');

    this.renderer.setStyle(nativeElement.querySelector('.img-menu-over'), 'max-width', '55px');
    this.renderer.setStyle(nativeElement.querySelector('.img-menu-over'), 'max-height', '55px');
  }

}
