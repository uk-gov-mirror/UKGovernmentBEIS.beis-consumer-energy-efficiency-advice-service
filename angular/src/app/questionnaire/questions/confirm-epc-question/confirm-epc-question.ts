import {ConfirmEpcQuestionComponent} from './confirm-epc-question.component';
import {Question} from '../question';
import {ResponseData} from '../response-data';
import {Epc} from '../postcode-epc-question/model/epc';
import {QuestionType} from '../../question-type';

export class ConfirmEpcQuestion extends Question<void, ConfirmEpcQuestionComponent> {
    constructor(responseData: ResponseData) {
        super(ConfirmEpcQuestionComponent, 'Here\'s what we know so far...', QuestionType.User, responseData);
    }

    get response(): void {
        return null;
    }

    set response(val: void) {
        // TODO
    }
}