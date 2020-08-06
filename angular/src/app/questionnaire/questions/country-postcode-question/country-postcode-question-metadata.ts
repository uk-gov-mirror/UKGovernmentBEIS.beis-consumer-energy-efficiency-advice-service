import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {CountryPostcodeQuestionComponent} from "./country-postcode-question.component";

export class CountryPostcodeQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            CountryPostcodeQuestionComponent,
            'postcode_epc',
            QuestionType.House
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.country !== undefined;
    }
}
