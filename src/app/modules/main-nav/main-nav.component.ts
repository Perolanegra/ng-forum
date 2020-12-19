import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
} from "@angular/core";
import { AppController } from "../../core/appController";
import { MainNavStyle } from "./main-nav.style";
import { Router } from "@angular/router";
import { Observable, Subscription, Subject } from "rxjs";
import { Select } from "@ngxs/store";
import { AppState } from "src/app/state/app/app.state";
import { Constants } from "../../core/pattern/constants";
import { NgDefault } from "src/app/core/pattern/ng-default";
@Component({
  selector: "ng-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent extends NgDefault implements OnInit {
  @Select(AppState.routes) routes$: Observable<any>;

  public vistoPic: Subject<any>;
  public hasMobileMatches: boolean;
  public hasEnterMenuRef: boolean = false;
  public profileDefault: Subject<any>;

  @ViewChild("userInfo") elRefUserInfo: ElementRef;
  @ViewChild("navListRoutes") elRefnavListRoutes: ElementRef;

  @Select(AppState.hasMobileMatches) stateMobileMatches$: Observable<any>;

  constructor(
    public router: Router,
    private mainNavStyle: MainNavStyle,
    public appController: AppController
  ) {
    super(appController);
  }

  ngOnInit() {
    Promise.resolve(null).then(() => this.setImg());
  }

  setImg(): void {
    this.routes$.subscribe((val: Array<any>) => {
      if (val) {
        // val[0].img.subscribe(ox => {
        //   console.log('valor img: ', ox);
        // });
      }
    });

    // this.vistoPic.next(
    //   this.appController.getImgObserver(Constants.defaultPattern.imgs.vistoPic)
    // );
    // this.profileDefault.next(
    //   this.appController.getImgObserver(
    //     Constants.defaultPattern.imgs.profileDefault
    //   )
    // );
  }

  onMenuBlur(hasEnterMenu) {
    this.hasEnterMenuRef = hasEnterMenu;
  }

  toggleMenu(elementRef: Element) {
    this.hasEnterMenuRef = true;
    this.mainNavStyle.setStyleMenuNavInit(elementRef, this.hasMobileMatches);
  }

  closeSideMenuMobile(elementRefSideMenu: ElementRef) {
    // quando o ElementRef vem de referência, ele já passa o nativeElement
    this.appController.removeElementClass(
      elementRefSideMenu,
      "side-menu-init--active"
    );
    this.mainNavStyle.setStyleMenuNavClose(
      this.elRefUserInfo.nativeElement,
      this.hasMobileMatches
    );
  }

  navigate(path: string) {
    this.appController.navigate(path);
    this.appController.setMenuActiveLink(path);
  }
}
