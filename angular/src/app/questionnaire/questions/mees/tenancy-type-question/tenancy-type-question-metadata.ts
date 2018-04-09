import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {TenancyTypeQuestionComponent} from './tenancy-type-question.component';

export class TenancyTypeQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            TenancyTypeQuestionComponent,
            'tenancy-type',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.isEpcRequired;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.tenancyType !== undefined;
    }
}
