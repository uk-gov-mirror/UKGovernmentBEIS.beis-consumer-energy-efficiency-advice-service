import {Question} from '../question';
import {ResponseData} from '../response-data';
import {PostcodeEpcQuestionComponent} from './postcode-epc-question.component';
import {PostcodeEpc} from './model/postcode-epc';
import {QuestionType} from '../../question-type';

export class PostcodeEpcQuestion extends Question<PostcodeEpc, PostcodeEpcQuestionComponent> {
    constructor(responseData: ResponseData) {
        super(PostcodeEpcQuestionComponent, 'What\'s your postcode?', QuestionType.User, responseData);
    }

    get response(): PostcodeEpc {
        const postcodeEpc = {
            epc: this.responseData.epc,
            postcode: this.responseData.postcode
        };
        return this.responseData.postcode && postcodeEpc;
    }

    set response(val: PostcodeEpc) {
        this.responseData.postcode = val.postcode;
        this.responseData.epc = val.epc;
    }
}