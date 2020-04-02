import { Injectable } from '@angular/core';
import { AppController } from '../core/appController';

@Injectable()
export class MainNavStyle {

    constructor(private appController: AppController) { }

    /**
     * @param elementRef Elemento a ser estilizado.
     * @param hasMobileMatches booleano que define se o device atual é mobile.
     */
    setStyleMenuNavInit(elementRef: any, hasMobileMatches: boolean) {
        if(elementRef) {
            this.appController.setElementClass(elementRef, 'side-menu-init--active');
            this.appController.removeElementClass(elementRef, 'div-fade-out');
            this.appController.setElementClass(elementRef, 'fade-transition-in');
            this.appController.removeElementClass(elementRef, 'fade-transition-out');

            this.appController.setElementStyle(elementRef.querySelector('.div-img-center-above'), 'height', '35vh');
            
            if (hasMobileMatches) {
                this.appController.setElementStyle(elementRef.querySelector('.div-img-center'), 'margin-top', '-33px');
                this.appController.removeElementClass(elementRef, 'div-fade-out');
                this.appController.removeElementClass(elementRef, 'fade-transition-out');
                this.appController.setElementClass(elementRef, 'fade-transition-in');
            }
           
            this.appController.removeElementClass(elementRef.querySelector('.div-user-info'), 'div-fade-out');

            this.appController.setElementStyle(elementRef.querySelector('#sideNav'), 'overflow', 'hidden auto');
        }
    }

    setStyleMenuClose(elementRef: any, hasMobileMatches: boolean) {
        if(elementRef) {
    
            if(hasMobileMatches) {
                this.appController.setElementClass(elementRef, 'div-fade-out');
                this.appController.removeElementClass(elementRef, 'fade-transition-in');
                this.appController.setElementClass(elementRef, 'fade-transition-out');
            }
            else {
                this.appController.setElementStyle(elementRef.querySelector('.div-img-center-above'), 'height', '19vh');
                this.appController.removeElementClass(elementRef, 'side-menu-init--active');
                this.appController.setElementClass(elementRef, 'side-menu-init');
                this.appController.removeElementClass(elementRef, 'fade-transition-in');
                this.appController.setElementClass(elementRef, 'fade-transition-out');

                this.appController.setElementClass(elementRef.querySelector('.div-user-info'), 'div-fade-out');
            }

        }
    }
}
