import {QuestionMetadata} from '../../base-question/question-metadata';
import {LoftClutterQuestionComponent} from './loft-clutter-question.component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {QuestionType} from '../question-type';

export class LoftClutterQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            LoftClutterQuestionComponent,
            'loft-clutter',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.hasLoft;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.isLoftAccessibleAndClearOfClutter !== undefined;
    }
}
