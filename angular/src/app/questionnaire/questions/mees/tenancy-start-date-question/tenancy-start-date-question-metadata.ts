import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {TenancyStartDateQuestionComponent} from './tenancy-start-date-question.component';
import {LettingDomesticPropertyStage} from '../letting-domestic-property-question/letting-domestic-property-stage';

export class TenancyStartDateQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            TenancyStartDateQuestionComponent,
            'tenancy-start-date',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.lettingDomesticPropertyStage === LettingDomesticPropertyStage.Currently;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.tenancyStartDate !== undefined;
    }
}
