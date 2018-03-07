import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {RoofSpaceQuestionComponent} from './roof-space-question.component';

export class RoofSpaceQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            RoofSpaceQuestionComponent,
            'roof-space',
            QuestionType.House,
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.roofSpace !== undefined;
    }
}
