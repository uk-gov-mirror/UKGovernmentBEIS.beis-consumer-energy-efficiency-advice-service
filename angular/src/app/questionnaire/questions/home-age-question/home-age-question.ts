import {Question} from '../question';
import {ResponseData} from '../response-data';
import {HomeAgeQuestionComponent} from './home-age-question.component';
import {HomeAge} from './home-age';

export class HomeAgeQuestion extends Question<HomeAge, HomeAgeQuestionComponent> {
    constructor(responseData: ResponseData) {
        super(HomeAgeQuestionComponent, 'How old is your home?', responseData)
    }

    get response(): HomeAge {
        return this.responseData.homeAge;
    }

    set response(val: HomeAge) {
        this.responseData.homeAge = val;
    }
}