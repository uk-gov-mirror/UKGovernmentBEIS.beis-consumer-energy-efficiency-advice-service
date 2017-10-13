import { Type } from '@angular/core';
import { QuestionBaseComponent } from "./question.component";

export abstract class Question<S, T extends QuestionBaseComponent<S>> {
    constructor(public questionComponent: Type<T>, public heading: string, private responseGetter: () => S, private responseSetter: (S) => void) {
    }

    get response(): S {
        return this.responseGetter();
    }

    set response(data: S) {
        this.responseSetter(data);
    }
}
