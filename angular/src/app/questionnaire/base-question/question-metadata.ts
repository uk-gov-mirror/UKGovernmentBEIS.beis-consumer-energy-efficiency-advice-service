import {Type} from '@angular/core';
import {QuestionBaseComponent} from './question-base-component';
import {ResponseData} from "../response-data/response-data";
import {QuestionType} from '../question-type';

export abstract class QuestionMetadata<S, T extends QuestionBaseComponent<S>> {
    constructor(
        public questionComponent: Type<T>,
        public heading: string,
        public questionType: QuestionType,
        protected responseData: ResponseData
    ) {
    }

    abstract get response(): S;

    abstract set response(val: S);

    isApplicable(): boolean {
        return true;
    }
}
