import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {TenancyTypeQuestionComponent} from './tenancy-type-question.component';
import {LettingDomesticPropertyStage} from '../letting-domestic-property-question/letting-domestic-property-stage';
import {TenancyStartDate} from '../tenancy-start-date-question/tenancy-start-date';

export class TenancyTypeQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            TenancyTypeQuestionComponent,
            'tenancy-type',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.lettingDomesticPropertyStage === LettingDomesticPropertyStage.Soon
            || responseData.tenancyStartDate === TenancyStartDate.AfterApril2018;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.tenancyType !== undefined;
    }
}
