import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {OptionalPropertyQuestionComponent} from './optional-property-question.component';

export class OptionalPropertyQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            OptionalPropertyQuestionComponent,
            'optional_property_question',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.epc === undefined;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.shouldIncludeOptionalPropertyQuestions !== undefined;
    }
}
