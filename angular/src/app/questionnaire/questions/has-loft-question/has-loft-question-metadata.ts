import {QuestionMetadata} from '../../base-question/question-metadata';
import {HasLoftQuestionComponent} from './has-loft-question.component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {QuestionType} from '../question-type';

export class HasLoftQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            HasLoftQuestionComponent,
            'has-loft',
            QuestionType.House
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.hasLoft !== undefined;
    }
}
