import {QuestionMetadata} from "../../base-question/question-metadata";
import {ShowersQuestionComponent} from "./showers-question.component";
import {QuestionType} from "../question-type";
import {ResponseData} from "../../../shared/response-data/response-data";

export class ShowersQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            ShowersQuestionComponent,
            'showers',
            QuestionType.Behaviour
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.numberOfShowersPerWeek !== undefined;
    }
}