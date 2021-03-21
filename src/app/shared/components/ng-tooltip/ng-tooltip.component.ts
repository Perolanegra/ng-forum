import { Component, OnInit } from '@angular/core';
import tippy from 'tippy.js';

@Component({
  selector: 'ng-tooltip',
  templateUrl: './ng-tooltip.component.html',
  styleUrls: ['./ng-tooltip.component.scss']
})
export class NgTooltipComponent implements OnInit {

  constructor() {
    
   }

  ngOnInit(): void {
  }


  
  teste() {
    tippy('#myButton', {
      content: 'My tooltip!',
    });
  }
}
