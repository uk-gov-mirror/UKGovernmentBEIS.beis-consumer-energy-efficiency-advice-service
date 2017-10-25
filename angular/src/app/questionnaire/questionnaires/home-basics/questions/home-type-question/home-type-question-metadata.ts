import {QuestionMetadata} from '../../../../base-question/question-metadata';
import {HomeTypeQuestionComponent} from './home-type-question.component';
import {HomeType} from './home-type';
import {QuestionType} from '../../../../question-type';
import {ResponseData} from "../../../../../common/response-data/response-data";

export class HomeTypeQuestionMetadata extends QuestionMetadata<HomeType> {
    constructor() {
        super(
            HomeTypeQuestionComponent,
            'home_type',
            QuestionType.House
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.homeType !== undefined;
    }
}