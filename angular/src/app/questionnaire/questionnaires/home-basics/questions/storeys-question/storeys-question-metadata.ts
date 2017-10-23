import {QuestionMetadata} from '../../../../base-question/question-metadata';
import {StoreysQuestionComponent} from './storeys-question.component';
import {QuestionType} from '../../../../question-type';
import {ResponseData} from "../../../../../common/response-data/response-data";
import {isBungalow, isParkHome} from '../home-type-question/home-type';

export class StoreysQuestionMetadata extends QuestionMetadata<number> {
    constructor() {
        super(
            StoreysQuestionComponent,
            'storeys',
            QuestionType.House
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.numberOfStoreys !== undefined;
    }

    isApplicable(responseData: ResponseData): boolean {
        return !isParkHome(responseData.homeType) && !isBungalow(responseData.homeType);
    }
}