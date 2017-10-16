import { Input, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Question} from "./question";

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
    state('none', style({transform: 'translateX(-50%)'})),
    state('left', style({transform: 'translateX(-50%)'})),
    state('right', style({transform: 'translateX(-50%)'})),
    transition('void => left', [
        style({transform: 'translateX(-100vw)'}),
        animate(500)
    ]),
    transition('void => right', [
        style({transform: 'translateX(100vw)'}),
        animate(500)
    ]),
    transition('left => void', [
        animate(500, style({transform: 'translateX(-100vw)'}))
    ]),
    transition('right => void', [
        animate(500, style({transform: 'translateX(100vw)'}))
    ])
]);

export abstract class QuestionBaseComponent<S> {
    @HostBinding('@slideInOut') @Input() slideInOut: string = 'none';
    @Input() question: Question<S, QuestionBaseComponent<S>>;
    @Input() notifyOfCompletion: () => void;

    get response(): S {
        return this.question.response;
    }

    set response(val: S) {
        this.question.response = val;
        this.notifyOfCompletion();
    }
}
