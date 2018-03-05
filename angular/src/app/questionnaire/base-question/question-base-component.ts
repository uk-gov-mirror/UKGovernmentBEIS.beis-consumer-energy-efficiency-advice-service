import {EventEmitter, HostBinding, Inject, Input, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ResponseData} from '../../shared/response-data/response-data';

export type SlideInFrom = 'none' | 'left' | 'right';

export function oppositeDirection(slideInFrom: SlideInFrom): SlideInFrom {
    if (slideInFrom === 'none') {
        return 'none';
    } else if (slideInFrom === 'left') {
        return 'right';
    } else if (slideInFrom === 'right') {
        return 'left';
    }
}

export const slideInOutAnimation = trigger('slideInOut', [
    // All states refer to when question is rendered in centre of page;
    // State indicates direction of slide in/out
    state('none', style({'margin-left': '0'})),
    state('left', style({'margin-left': '0', order: 1})),
    state('right', style({'margin-left': '0', order: 2})),
    // Slide in from left
    transition('void => left', [
        style({'margin-left': '-100vw', order: 1}),
        animate(500)
    ]),
    // Slide in from right - no animation required
    // Slide out to left
    transition('left => void', [
        animate(500, style({'margin-left': '-100vw', order: 1}))
    ]),
    // Slide out to right
    transition('right => void', [
        animate(500, style({order: 2}))
    ])
]);

export abstract class QuestionBaseComponent {
    abstract get responseForAnalytics(): string;

    constructor(@Inject(ResponseData) protected responseData: ResponseData) {
    }

    @HostBinding('@slideInOut') @Input() slideInOut: string = 'none';
    @Output() complete: EventEmitter<void> = new EventEmitter<void>();
}
