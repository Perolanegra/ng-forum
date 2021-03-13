import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
} from "@angular/core";
import { AppController } from "../../core/appController";
import { MainNavStyle } from "./main-nav.style";
import { Router, ActivatedRoute } from "@angular/router";
import { AppState } from "src/app/state/app/app.state";
import { Constants } from "../../core/pattern/constants";
import { NgDefault } from "src/app/core/pattern/ng-default";
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
@Component({
  selector: "ng-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent extends NgDefault implements OnInit {

  @ViewChild("userInfo") elRefUserInfo: ElementRef;
  @SelectSnapshot(AppState.routes) routes: any[];

  public vistoPic: string;
  public profileDefault: string;
  public hasEnterMenuRef: boolean = false;

  constructor(
    public router: Router,
    private mainNavStyle: MainNavStyle,
    public appController: AppController,
    protected route: ActivatedRoute,
  ) {
    super(appController, route);
  }

  ngOnInit(): void {
    this.setImg();
  }

  setImg(): void {
    this.vistoPic = this.appController.getImg(Constants.defaultPattern.imgs.vistoPic);
    this.profileDefault = this.appController.getImg(Constants.defaultPattern.imgs.profileDefault);
  }

  onMenuBlur(hasEnterMenu): void {
    this.hasEnterMenuRef = hasEnterMenu;
  }

  toggleMenu(elementRef: Element): void {
    this.hasEnterMenuRef = true;
    this.mainNavStyle.setStyleMenuNavInit(elementRef, this.hasMobileMatches);
  }

  closeSideMenuMobile(elementRefSideMenu: ElementRef): void {
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

  navigate(path: string): void {
    this.appController.navigate(path);
    this.appController.setMenuActiveLink(path);
  }
}
