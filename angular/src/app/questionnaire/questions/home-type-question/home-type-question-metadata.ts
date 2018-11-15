import {QuestionMetadata} from '../../base-question/question-metadata';
import {HomeTypeQuestionComponent} from './home-type-question.component';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';

export class HomeTypeQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            HomeTypeQuestionComponent,
            'home_type',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.epc === undefined;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.homeType !== undefined;
    }
}
