import {ResponseData} from '../../../shared/response-data/response-data';
import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {TumbleDryQuestionComponent} from './tumble-dry-question.component';

export class TumbleDryQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            TumbleDryQuestionComponent,
            'tumble_dry',
            QuestionType.Behaviour
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.tumbleDryPercentage !== undefined;
    }
}
