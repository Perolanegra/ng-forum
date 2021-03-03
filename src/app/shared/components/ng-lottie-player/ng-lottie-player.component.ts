import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { AppController } from "src/app/core/appController";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "ng-lottie-player",
  templateUrl: "./ng-lottie-player.component.html",
  styleUrls: ["./ng-lottie-player.component.scss"],
})
export class NgLottiePlayerComponent implements OnInit {
  constructor(public appController: AppController, public http: HttpClient) {}

  @Input() hasAutoPlay = false;
  @Input() showOnHover = false;
  @Input() filename: string;
  @Input() hasBounceMode = false;
  @Input() speed: number = 1;
  
  ngOnInit(): void {
    this.loadJson();
  }

  loadJson(): void {
    const player = document.querySelector("lottie-player");
    const url = `${environment.prefixAnimationJSON}${this.filename}.json`;
    this.http.get(url).subscribe((data) => {
      if (data) {
        player.src = JSON.stringify(data);
      }
    });
  }
}
