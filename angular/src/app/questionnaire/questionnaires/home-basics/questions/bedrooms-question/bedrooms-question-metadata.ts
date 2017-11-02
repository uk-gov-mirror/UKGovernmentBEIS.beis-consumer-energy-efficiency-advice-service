import {QuestionMetadata} from "../../../../base-question/question-metadata";
import {BedroomsQuestionComponent} from "./bedrooms-question.component";
import {QuestionType} from "../../../../question-type";
import {ResponseData} from "../../../../../shared/response-data/response-data";

export class BedroomsQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            BedroomsQuestionComponent,
            'bedrooms',
            QuestionType.House
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.numberOfBedrooms !== undefined;
    }
}