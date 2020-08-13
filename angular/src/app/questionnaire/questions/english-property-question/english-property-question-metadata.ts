import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {EnglishPropertyQuestionComponent} from "./english-property-question.component";

export class EnglishPropertyQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            EnglishPropertyQuestionComponent,
            'english_property',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.englishProperty === undefined;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.englishProperty !== undefined;
    }
}
