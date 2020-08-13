import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {PensionGuaranteeCreditQuestionComponent} from './pension-guarantee-credit-question.component';

export class PensionGuaranteeCreditQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            PensionGuaranteeCreditQuestionComponent,
            'pension_guarantee_credit',
            QuestionType.Behaviour
        );
    }

    // If you change question order, the other isApplicable functions in benefits-questions should be revised
    isApplicable(responseData: ResponseData): boolean {
        return responseData.shouldIncludeGrantsQuestionnaire
            && !responseData.receiveIncomeRelatedBenefits;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.receivePensionGuaranteeCredit !== undefined;
    }
}
