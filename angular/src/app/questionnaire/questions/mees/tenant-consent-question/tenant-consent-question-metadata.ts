import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {TenantConsentQuestionComponent} from './tenant-consent-question.component';

export class TenantConsentQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            TenantConsentQuestionComponent,
            'tenant-consent',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.hasRecommendedImprovements;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.hasRelevantConsent !== undefined;
    }
}
