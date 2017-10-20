import {ConfirmEpcQuestionComponent} from './confirm-epc-question.component';
import {QuestionMetadata} from '../../base-question/question-metadata';
import {ResponseData} from '../../../response-data/response-data';
import {QuestionType} from '../../question-type';
import {EpcConfirmation} from './epc-confirmation';

export class ConfirmEpcQuestionMetadata extends QuestionMetadata<EpcConfirmation> {

    constructor() {
        super(
            ConfirmEpcQuestionComponent,
            'Here\'s what we know so far...',
            QuestionType.User
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.confirmEpc !== undefined;
    }
}