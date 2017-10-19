import {QuestionMetadata} from '../../base-question/question-metadata';
import {ResponseData} from '../../response-data/response-data';
import {HomeAgeQuestionComponent} from './home-age-question.component';
import {HomeAge} from './home-age';
import {QuestionType} from '../../question-type';

export class HomeAgeQuestion extends QuestionMetadata<HomeAge, HomeAgeQuestionComponent> {
    constructor(responseData: ResponseData) {
        super(HomeAgeQuestionComponent, 'How old is your home?', QuestionType.House, responseData)
    }

    get response(): HomeAge {
        return this.responseData.homeAge;
    }

    set response(val: HomeAge) {
        this.responseData.homeAge = val;
    }
}