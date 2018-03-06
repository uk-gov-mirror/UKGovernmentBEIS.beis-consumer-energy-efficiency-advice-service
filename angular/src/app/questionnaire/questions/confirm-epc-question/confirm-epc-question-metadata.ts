import {ConfirmEpcQuestionComponent} from './confirm-epc-question.component';
import {QuestionMetadata} from '../../base-question/question-metadata';
import {ResponseData} from '../../../shared/response-data/response-data';
import {QuestionType} from '../question-type';
import {EpcConfirmation} from './epc-confirmation';

export class ConfirmEpcQuestionMetadata extends QuestionMetadata {

    constructor() {
        super(
            ConfirmEpcQuestionComponent,
            'confirm_epc',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.postcode === undefined || responseData.epc !== null;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.confirmEpc !== undefined;
    }
}
