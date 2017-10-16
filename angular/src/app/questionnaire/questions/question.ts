import { Type } from '@angular/core';
import { QuestionBaseComponent } from "./question.component";
import {ResponseData} from "./response-data";

export abstract class Question<S, T extends QuestionBaseComponent<S>> {
    constructor(public questionComponent: Type<T>, public heading: string, protected responseData: ResponseData) {
    }

    abstract get response(): S;

    abstract set response(val: S);

    isApplicable(): boolean {
        return true;
    }
}
