import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {ChildBenefitsQuestionComponent} from "./child-benefits-question.component";

export class ChildBenefitsQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            ChildBenefitsQuestionComponent,
            'child_benefits',
            QuestionType.Behaviour
        );
    }

    // If you change question order, the other isApplicable functions in benefits-questions should be revised
    isApplicable(responseData: ResponseData): boolean {
        return !responseData.receivePensionGuaranteeCredit
            && !responseData.receiveIncomeRelatedBenefits
            && !responseData.receiveSocietalBenefits
            && !responseData.receiveDefenseRelatedBenefits;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.receiveChildBenefits !== undefined;
    }
}
