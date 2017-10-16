import {PostcodeEpcQuestionComponent} from './postcode-epc-question.component';
import {Question} from '../question';
import {ResponseData} from '../response-data';
export class PostcodeEpcQuestion extends Question<string, PostcodeEpcQuestionComponent> {
    constructor(responseData: ResponseData) {
        super(PostcodeEpcQuestionComponent, 'What\'s your postcode?', responseData);
    }

    get response(): string {
        return this.responseData.postCode;
    }

    set response(val: string) {
        this.responseData.postCode = val;
    }
}