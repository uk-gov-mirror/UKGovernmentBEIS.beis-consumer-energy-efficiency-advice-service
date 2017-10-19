import {Input, HostBinding} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {QuestionMetadata} from './question-metadata';

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
    state('none', style({left: '50%'})),
    state('left', style({left: '50%'})),
    state('right', style({left: '50%'})),
    transition('void => left', [
        style({left: '-50vw'}),
        animate(500)
    ]),
    transition('void => right', [
        style({left: '150vw'}),
        animate(500)
    ]),
    transition('left => void', [
        animate(500, style({left: '-50vw'}))
    ]),
    transition('right => void', [
        animate(500, style({left: '150vw'}))
    ])
]);

export abstract class QuestionBaseComponent<S> {
    @HostBinding('@slideInOut') @Input() slideInOut: string = 'none';
    @Input() question: QuestionMetadata<S, QuestionBaseComponent<S>>;
    @Input() notifyOfCompletion: () => void;

    get response(): S {
        return this.question.response;
    }

    set response(val: S) {
        this.question.response = val;
    }
}
