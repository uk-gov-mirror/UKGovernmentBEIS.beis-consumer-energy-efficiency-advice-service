import {Type} from '@angular/core';
import {QuestionBaseComponent} from './question-base-component';
import {QuestionType} from '../questions/question-type';
import {ResponseData} from '../../shared/response-data/response-data';

export abstract class QuestionMetadata {
    constructor(public readonly componentType: Type<QuestionBaseComponent>,
                public readonly questionId: string,
                public readonly questionType: QuestionType, ) {
    }

    isApplicable(responseData: ResponseData): boolean {
        return true;
    }

    abstract hasBeenAnswered(responseData: ResponseData): boolean;
}
