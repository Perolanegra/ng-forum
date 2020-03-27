import { Directive, HostListener, Output, EventEmitter, Input, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMenuOver]',
 
})
export class AppMenuOverDirective {
  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  @Output() hasEnterMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() hasMobileMatches: boolean;
  
  @HostListener('mouseenter') onMouseOver(eventData: Event): void {
    this.hasEnterMenu.emit(true);
    this.renderer.setStyle(this.elRef.nativeElement, 'width', '296px');
    const nativeElement: HTMLElement = this.elRef.nativeElement;
   
    this.renderer.setStyle(nativeElement.querySelector('#sideNav'), 'margin-top', '-8vh');

    this.renderer.setStyle(nativeElement.querySelector('.div-img-background'), 'width', '120px');
    this.renderer.setStyle(nativeElement.querySelector('.div-img-background'), 'height', '119px');

    const heightDivMenuTop = this.hasMobileMatches ? '350px' : '250px';
    this.renderer.setStyle(nativeElement.querySelector('.div-img-center-above'), 'height', heightDivMenuTop);

    const maxWidthImgLogoMenu = this.hasMobileMatches ? '100px' : '130px';
    this.renderer.setStyle(nativeElement.querySelector('.img-logo-menu'), 'max-width', maxWidthImgLogoMenu);

    const bottomMenuVh = this.hasMobileMatches ? '20vh' : '17vh';
    this.renderer.setStyle(nativeElement.querySelector('.div-img-center'), 'bottom', bottomMenuVh);

    this.renderer.setStyle(nativeElement.querySelector('#sideNav'), 'overflow', 'hidden auto');


    this.renderer.setStyle(nativeElement.querySelector('.img-menu-over'), 'max-width', '100px');
    this.renderer.setStyle(nativeElement.querySelector('.img-menu-over'), 'max-height', '99px');
 
  }

  @HostListener('mouseleave') onMouseLeave(eventData: Event): void {
    this.hasEnterMenu.emit(false);
    this.renderer.setStyle(this.elRef.nativeElement, 'width', '90px');
    const nativeElement: HTMLElement = this.elRef.nativeElement;

    this.renderer.setStyle(nativeElement.querySelector('#sideNav'), 'overflow', 'hidden');
    this.renderer.setStyle(nativeElement.querySelector('#sideNav'), 'margin-top', '-3vh');
    
    this.renderer.setStyle(nativeElement.querySelector('.div-img-background'), 'width', '66px');
    this.renderer.setStyle(nativeElement.querySelector('.div-img-background'), 'margin-top', '15%');
    this.renderer.setStyle(nativeElement.querySelector('.div-img-background'), 'height', '65px');

    const heightDivMenuTop = this.hasMobileMatches ? '150px' : '190px';
    this.renderer.setStyle(nativeElement.querySelector('.div-img-center-above'), 'height', heightDivMenuTop);

    const maxWidthPxNgLogoMenu = this.hasMobileMatches ? '75px' : '90px';
    this.renderer.setStyle(nativeElement.querySelector('.img-logo-menu'), 'max-width', maxWidthPxNgLogoMenu);

    this.renderer.setStyle(nativeElement.querySelector('.div-img-center'), 'bottom', '9vh');

    this.renderer.setStyle(nativeElement.querySelector('.img-menu-over'), 'max-width', '55px');
    this.renderer.setStyle(nativeElement.querySelector('.img-menu-over'), 'max-height', '55px');
  }

}
