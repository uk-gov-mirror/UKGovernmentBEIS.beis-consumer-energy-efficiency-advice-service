import {QuestionMetadata} from '../../base-question/question-metadata';
import {HomeAgeQuestionComponent} from './home-age-question.component';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';

export class HomeAgeQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            HomeAgeQuestionComponent,
            'home_age',
            QuestionType.House
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.homeAge !== undefined;
    }

    isApplicable(responseData: ResponseData): boolean {
        return !responseData.epc || responseData.epc.constructionAgeBand === null;
    }
}
