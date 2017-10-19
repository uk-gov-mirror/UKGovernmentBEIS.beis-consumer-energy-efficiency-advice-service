import {QuestionMetadata} from '../../base-question/question-metadata';
import {BedroomsQuestionComponent} from './bedrooms-question.component';
import {QuestionType} from '../../question-type';
import {ResponseData} from "../../../response-data/response-data";

export class BedroomsQuestionMetadata extends QuestionMetadata<number> {
    constructor() {
        super(
            BedroomsQuestionComponent,
            'How many bedrooms do you have?',
            QuestionType.House
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.numberOfBedrooms !== undefined;
    }
}