import { NgDefaultList } from "./ng-default-list";
import { ActivatedRoute } from "@angular/router";
import { AppController } from '../appController';

export abstract class NgDetails extends NgDefaultList {
    constructor(protected route: ActivatedRoute, protected appController: AppController) { 
        super(route, appController);
    }
}
