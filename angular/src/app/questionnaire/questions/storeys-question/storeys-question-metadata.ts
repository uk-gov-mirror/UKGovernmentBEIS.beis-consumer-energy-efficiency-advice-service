import {QuestionMetadata} from '../../base-question/question-metadata';
import {StoreysQuestionComponent} from './storeys-question.component';
import {QuestionType} from '../../question-type';
import {ResponseData} from "../../../response-data/response-data";

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
}