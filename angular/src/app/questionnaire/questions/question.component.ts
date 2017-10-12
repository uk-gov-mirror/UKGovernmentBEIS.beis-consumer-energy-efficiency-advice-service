import { Component, Input, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

declare const Reflect: any;

const slideInOutAnimation = trigger('slideInOut', [
    state('default', style({transform: 'translateX(0)'})),
    transition(':enter', [
        style({transform: 'translateX(100vw)'}),
        animate(500)
    ]),
    transition(':leave', [
        animate(500, style({transform: 'translateX(-100vw)'}))
    ])
]);

export function QuestionComponent(metadata: any = {}) {
    return function(cls: any) {
        const annotations = Reflect.getMetadata('annotations', cls) || [];
        annotations.push(new Component({...metadata, encapsulation: ViewEncapsulation.None, animations: [slideInOutAnimation], host: {'[@slideInOut]': 'default'}}));
        Reflect.defineMetadata('annotations', annotations, cls);
        return cls;
    };
}

export class QuestionBaseComponent<S> {
    @Input() response: S;
    @Input() onResponse: (response: S) => void;
}