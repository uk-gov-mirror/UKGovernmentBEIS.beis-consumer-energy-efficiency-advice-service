import {Question} from '../question';
import {ResponseData} from '../response-data';
import {PostcodeEpcQuestionComponent} from './postcode-epc-question.component';
import {PostcodeEpc} from './model/postcode-epc';

export class PostcodeEpcQuestion extends Question<PostcodeEpc, PostcodeEpcQuestionComponent> {
    constructor(responseData: ResponseData) {
        super(PostcodeEpcQuestionComponent, 'What\'s your postcode?', responseData);
    }

    get response(): PostcodeEpc {
        return {
            epc: this.responseData.epc,
            postcode: this.responseData.postcode
        };
    }

    set response(val: PostcodeEpc) {
        this.responseData.postcode = val.postcode;
        this.responseData.epc = val.epc;
    }
}