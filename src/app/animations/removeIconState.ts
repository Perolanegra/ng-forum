import { style, state } from '@angular/animations';

export const RemoveIconState = [
    state('disabled', style({ 'opacity': '0.4', 'pointer-events': 'none' })),
    state('enabled', style({ 'opacity': '1', 'pointer-events': 'auto' }))
]