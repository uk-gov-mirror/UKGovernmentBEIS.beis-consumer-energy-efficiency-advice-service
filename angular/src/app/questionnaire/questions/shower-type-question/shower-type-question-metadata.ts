import {QuestionMetadata} from "../../base-question/question-metadata";
import {QuestionType} from "../question-type";
import {ResponseData} from "../../../shared/response-data/response-data";
import {ShowerTypeQuestionComponent} from "./shower-type-question.component";

export class ShowerTypeQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            ShowerTypeQuestionComponent,
            'shower-type',
            QuestionType.Behaviour
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.showerType !== undefined;
    }
}