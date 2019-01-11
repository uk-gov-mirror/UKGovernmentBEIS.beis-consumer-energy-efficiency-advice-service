import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {SocietalBenefitsQuestionComponent} from "./societal-benefits-question.component";

export class SocietalBenefitsQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            SocietalBenefitsQuestionComponent,
            'benefits',
            QuestionType.Behaviour
        );
    }

    // If you change question order, the other isApplicable functions in benefits-questions should be revised
    isApplicable(responseData: ResponseData): boolean {
        return responseData.shouldIncludeGrantsQuestionnaire
            && !responseData.receivePensionGuaranteeCredit
            && !responseData.receiveIncomeRelatedBenefits;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.receiveSocietalBenefits !== undefined;
    }
}
