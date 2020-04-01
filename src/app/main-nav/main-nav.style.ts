import { Injectable } from '@angular/core';
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
        this.appControler.setElementStyle(elementRef.querySelector('.div-img-center-above'), 'height', '35vh');
        
        if (hasMobileMatches) {
            this.appControler.setElementStyle(elementRef.querySelector('.div-img-center'), 'margin-top', '-33px');
        }
      
        this.appControler.setElementStyle(elementRef.querySelector('#sideNav'), 'overflow', 'hidden auto');
    }
}
