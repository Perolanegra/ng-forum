import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: "ng-teste",
  templateUrl: "./teste.component.html",
  styleUrls: ["./teste.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TesteComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
}