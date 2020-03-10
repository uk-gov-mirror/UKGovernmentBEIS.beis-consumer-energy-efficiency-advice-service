import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {WallTypeQuestionComponent} from './wall-type-question.component';

export class WallTypeQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            WallTypeQuestionComponent,
            'wall-type',
            QuestionType.House,
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.wallType !== undefined;
    }
}
