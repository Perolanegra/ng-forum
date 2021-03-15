import { Injectable } from "@angular/core";
import { DefaultResolver } from "../../../core/default.resolver";
import { Observable } from "rxjs";
import { IssuesService } from '../issues.service';


@Injectable()
export class DetailsByIdResolver extends DefaultResolver {
  constructor(
    private service: IssuesService,
  ) {
    super();
  }

  resolver(params: any): Observable<any | undefined> {
    return this.service.getDetailsById(params.id);
  }
}


