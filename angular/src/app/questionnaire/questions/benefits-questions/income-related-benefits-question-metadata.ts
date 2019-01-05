import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {IncomeRelatedBenefitsQuestionComponent} from "./income-related-benefits-question.component";

export class IncomeRelatedBenefitsQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            IncomeRelatedBenefitsQuestionComponent,
            'benefits',
            QuestionType.Behaviour
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return !responseData.receivePensionGuaranteeCredit;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.receiveIncomeRelatedBenefits !== undefined;
    }
}
