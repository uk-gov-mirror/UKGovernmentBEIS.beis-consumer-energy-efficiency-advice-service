import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {ConstructionQuestionComponent} from './construction-question.component';

export class ConstructionQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            ConstructionQuestionComponent,
            'insulation',
            QuestionType.House,
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.shouldIncludeOptionalPropertyQuestions === undefined || responseData.shouldIncludeOptionalPropertyQuestions;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.wallType !== undefined &&
               responseData.roofType !== undefined &&
               responseData.glazingType !== undefined;
    }
}
