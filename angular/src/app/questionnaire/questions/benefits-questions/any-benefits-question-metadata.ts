import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {AnyBenefitsQuestionComponent} from "./any-benefits-question.component";

export class AnyBenefitsQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            AnyBenefitsQuestionComponent,
            'any_benefits',
            QuestionType.Behaviour
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.receiveAnyBenefits === undefined;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.receiveAnyBenefits !== undefined;
    }
}
