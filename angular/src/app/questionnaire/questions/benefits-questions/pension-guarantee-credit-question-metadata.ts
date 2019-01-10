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

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.receivePensionGuaranteeCredit !== undefined;
    }
}
