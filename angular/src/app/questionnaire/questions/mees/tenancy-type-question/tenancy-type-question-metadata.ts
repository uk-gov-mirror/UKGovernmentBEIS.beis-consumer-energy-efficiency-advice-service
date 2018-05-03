import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {TenancyTypeQuestionComponent} from './tenancy-type-question.component';
import {LettingDomesticPropertyStage} from '../letting-domestic-property-question/letting-domestic-property-stage';

export class TenancyTypeQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            TenancyTypeQuestionComponent,
            'tenancy-type',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return [
            LettingDomesticPropertyStage.AfterApril2018,
            LettingDomesticPropertyStage.InPlanning,
            LettingDomesticPropertyStage.InProcess,
        ].includes(responseData.lettingDomesticPropertyStage);
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.tenancyType !== undefined;
    }
}
