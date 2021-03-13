import { NgDefaultList } from "./ng-default-list";
import { ActivatedRoute } from "@angular/router";

export abstract class NgDetails extends NgDefaultList {
    constructor(protected route: ActivatedRoute) { 
        super(route);
    }
}
