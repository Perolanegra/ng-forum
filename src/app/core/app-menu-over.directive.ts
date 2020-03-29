import { Directive, HostListener, Output, EventEmitter, Input, Renderer2, ElementRef, OnInit } from '@angular/core';
import { AppController } from './appController';
import { MainNavStyle } from '../main-nav/main-nav.style';

@Directive({
  selector: '[appMenuOver]',
  
})
export class AppMenuOverDirective {
  constructor(private elRef: ElementRef, private appControler: AppController, private mainNavStyle: MainNavStyle) { }

  @Output() hasEnterMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() hasMobileMatches: boolean;
  
  @HostListener('mouseenter') onMouseOver(eventData: Event): void {
    this.hasEnterMenu.emit(true);
    this.mainNavStyle.setStyleMenuNavInit(this.elRef.nativeElement, this.hasMobileMatches);
  }
  

  // @HostListener('mouseleave') onMouseLeave(eventData: Event): void {
  //   this.hasEnterMenu.emit(false);
  //   const nativeElement: HTMLElement = this.elRef.nativeElement;

  //   if(this.hasMobileMatches) {
  //     this.renderer.setStyle(this.elRef.nativeElement, 'width', '26vw');
  //   } else {
  //     this.renderer.setStyle(this.elRef.nativeElement, 'width', '8vw');
  //   }
  // }

}
