import {QuestionMetadata} from "../../base-question/question-metadata";
import {ShowersAndBathsQuestionComponent} from "./showers-and-baths-question.component";
import {QuestionType} from "../question-type";
import {ResponseData} from "../../../shared/response-data/response-data";

export class ShowersAndBathsQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            ShowersAndBathsQuestionComponent,
            'showers-and-baths',
            QuestionType.Behaviour
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.numberOfShowersPerWeek !== undefined || responseData.numberOfBathsPerWeek !== undefined;
    }
}