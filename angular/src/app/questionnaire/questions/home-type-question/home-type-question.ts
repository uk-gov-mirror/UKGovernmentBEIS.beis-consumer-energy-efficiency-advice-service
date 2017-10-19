import {QuestionMetadata} from '../../base-question/question-metadata';
import {HomeTypeQuestionComponent} from './home-type-question.component';
import {HomeType} from './home-type';
import {ResponseData} from '../../response-data/response-data';
import {QuestionType} from '../../question-type';

export class HomeTypeQuestion extends QuestionMetadata<HomeType, HomeTypeQuestionComponent> {
    constructor(responseData: ResponseData) {
        super(HomeTypeQuestionComponent, 'So what type of home do you have?', QuestionType.House, responseData);
    }

    get response(): HomeType {
        return this.responseData.homeType;
    }

    set response(val: HomeType) {
        this.responseData.homeType = val;
    }
}