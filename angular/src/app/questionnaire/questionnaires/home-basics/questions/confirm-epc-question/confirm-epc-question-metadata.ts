import {ConfirmEpcQuestionComponent} from './confirm-epc-question.component';
import {QuestionMetadata} from '../../../../base-question/question-metadata';
import {ResponseData} from '../../../../../common/response-data/response-data';
import {QuestionType} from '../../../../question-type';
import {EpcConfirmation} from './epc-confirmation';

export class ConfirmEpcQuestionMetadata extends QuestionMetadata<EpcConfirmation> {

    constructor() {
        super(
            ConfirmEpcQuestionComponent,
            'confirm_epc',
            QuestionType.User
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.postcode === undefined || responseData.epc !== null;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.confirmEpc !== undefined;
    }
}