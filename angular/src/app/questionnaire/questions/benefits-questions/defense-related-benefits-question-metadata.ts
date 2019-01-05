import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {DefenseRelatedBenefitsQuestionComponent} from "./defense-related-benefits-question.component";

export class DefenseRelatedBenefitsQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            DefenseRelatedBenefitsQuestionComponent,
            'benefits',
            QuestionType.Behaviour
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return !responseData.receivePensionGuaranteeCredit
            && !responseData.receiveIncomeRelatedBenefits
            && !responseData.receiveSocietalBenefits;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.receiveDefenseRelatedBenefits !== undefined;
    }
}
