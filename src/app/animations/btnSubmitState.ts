import { animate, style, state, transition } from '@angular/animations';

export const BtnSubmitState = [
    state('disabled', style({ 'opacity': '0.4', 'pointer-events': 'none' })),
    state('enabled', style({ 'opacity': '1', 'pointer-events': 'auto', 'color': 'black' })),
    transition('disabled => enabled', animate(300)),
    transition('enabled => disabled', animate(300))
];

// <h2>Hello {{name}}</h2>
// <button (click)="toggle()">Toggle</button>
// <div *ngIf="show" @ngIfAnimation>
//   <h3 @easeInOut>I'm inside ngIf</h3>
// </div>
// </div>
// `,
// animations: [
// trigger('ngIfAnimation', [
// transition(':enter, :leave', [
// query('@*', animateChild())
// ])
// ])
// trigger('easeInOut', [
// transition('void => *', [
//   style({
//       opacity: 0
//   }),
//   animate("1s ease-in-out", style({
//       opacity: 1
//   }))
// ]),
// transition('* => void', [
//   style({
//       opacity: 1
//   }),
//   animate("1s ease-in-out", style({
//       opacity: 0
//   }))
// ])
// ])
// ]]