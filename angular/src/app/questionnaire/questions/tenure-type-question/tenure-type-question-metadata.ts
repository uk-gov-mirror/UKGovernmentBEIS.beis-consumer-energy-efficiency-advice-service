import {QuestionMetadata} from "../../base-question/question-metadata";
import {QuestionType} from "../question-type";
import {ResponseData} from "../../../shared/response-data/response-data";
import {TenureTypeQuestionComponent} from "./tenure-type-question.component";

export class TenureTypeQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            TenureTypeQuestionComponent,
            'tenure-type',
            QuestionType.House
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.tenureType !== undefined;
    }
}