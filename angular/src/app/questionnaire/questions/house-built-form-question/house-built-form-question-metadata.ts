import {QuestionMetadata} from '../../base-question/question-metadata';
import {ResponseData} from '../../../shared/response-data/response-data';
import {QuestionType} from '../question-type';
import {isHouseOrBungalow} from '../home-type-question/home-type';
import {HouseBuiltFormQuestionComponent} from "./house-built-form-question.component";

export class HouseBuiltFormQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            HouseBuiltFormQuestionComponent,
            'house_built_form',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.homeType == null || isHouseOrBungalow(responseData.homeType);
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.houseBuiltForm != null;
    }
}
