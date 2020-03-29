import { Injectable, ElementRef } from "@angular/core";
import { AppController } from '../core/appController';

@Injectable()
export class MainNavStyle {
    
    constructor(private appControler: AppController) { }

    /**
     * @param elementRef Elemento a ser estilizado.
     * @param hasMobileMatches booleano que define se o device atual é mobile.
     */
    setStyleMenuNavInit(elementRef: any, hasMobileMatches: boolean) {
        this.appControler.setElementClass(elementRef, 'side-menu-init--active');

        if(hasMobileMatches) {
            this.appControler.setElementStyle(elementRef.querySelector('.div-img-center-above'), 'height', '35vh');
            this.appControler.setElementStyle(elementRef.querySelector('.div-img-center'), 'margin-top', '-33px')

        } else {      
            this.appControler.setElementStyle(elementRef.querySelector('.div-img-center-above'), 'height', '250px');
        }
    
        this.appControler.setElementStyle(elementRef.querySelector('#sideNav'), 'overflow', 'hidden auto');
    }
}