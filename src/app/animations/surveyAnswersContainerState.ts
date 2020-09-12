import { style, state } from '@angular/animations';

export const SurveyAnswersContainerState = [
    state('overflowDisabled', style({ 'overflow-y': 'none', 'padding-right': 'none' })),
    state('overflowEnabled', style({ 'overflow': 'hidden scroll', 'padding-right': '15px' }))
];