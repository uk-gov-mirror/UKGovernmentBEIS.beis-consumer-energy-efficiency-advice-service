import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {GlazingTypeQuestionComponent} from "./glazing-type-question.component";

export class GlazingTypeQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            GlazingTypeQuestionComponent,
            'glazing_type',
            QuestionType.House
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.glazingType !== undefined;
    }
}
