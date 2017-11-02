import {QuestionMetadata} from "../../../../base-question/question-metadata";
import {QuestionType} from "../../../../question-type";
import {ResponseData} from "../../../../../shared/response-data/response-data";
import {BathsQuestionComponent} from "./baths-question.component";

export class BathsQuestionMetadata extends QuestionMetadata<number> {
    constructor() {
        super(
            BathsQuestionComponent,
            'baths',
            QuestionType.User
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.numberOfBathsPerWeek !== undefined;
    }
}