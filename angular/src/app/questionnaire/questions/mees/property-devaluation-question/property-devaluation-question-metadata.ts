import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {PropertyDevaluationQuestionComponent} from './property-devaluation-question.component';

export class PropertyDevaluationQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            PropertyDevaluationQuestionComponent,
            'property-devaluation',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.hasRelevantConsent;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.willPropertyBeDevalued !== undefined;
    }
}
