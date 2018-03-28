import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {EpcBelowEQuestionComponent} from './epc-below-e-question.component';
import {TenancyType} from '../tenancy-type-question/tenancy-type';

export class EpcBelowEQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            EpcBelowEQuestionComponent,
            'epc-below-e',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.tenancyType !== undefined && responseData.tenancyType !== TenancyType.Other;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.isEpcBelowE !== undefined;
    }
}
