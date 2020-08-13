import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {ContributionBasedBenefitsQuestionComponent} from "./contribution-based-benefits-question.component";

export class ContributionBasedBenefitsQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            ContributionBasedBenefitsQuestionComponent,
            'benefits',
            QuestionType.Behaviour
        );
    }

    // If you change question order, the other isApplicable functions in benefits-questions should be revised
    isApplicable(responseData: ResponseData): boolean {
        return responseData.shouldIncludeGrantsQuestionnaire
            && !responseData.receiveIncomeRelatedBenefits
            && !responseData.receivePensionGuaranteeCredit
            && !responseData.receiveSocietalBenefits;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.receiveContributionBasedBenefits !== undefined;
    }
}
