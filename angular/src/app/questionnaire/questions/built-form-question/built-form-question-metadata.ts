import {QuestionMetadata} from '../../base-question/question-metadata';
import {ResponseData} from '../../../shared/response-data/response-data';
import {QuestionType} from '../question-type';
import {isHouseOrBungalow} from '../home-type-question/home-type';
import {BuiltFormQuestionComponent} from "./built-form-question.component";

export class BuiltFormQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            BuiltFormQuestionComponent,
            'built_form',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.epc === undefined &&
            (responseData.homeType == null || isHouseOrBungalow(responseData.homeType));
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.builtForm != null;
    }
}
