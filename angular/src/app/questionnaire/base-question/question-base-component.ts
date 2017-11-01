import {EventEmitter, HostBinding, Inject, Input, Output} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ResponseData} from "../../shared/response-data/response-data";

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

    constructor(@Inject(ResponseData) protected responseData: ResponseData) {
    }

    @HostBinding('@slideInOut') @Input() slideInOut: string = 'none';
    @Output() complete: EventEmitter<void> = new EventEmitter<void>();

    abstract get response(): S;
    abstract set response(val: S);
}
