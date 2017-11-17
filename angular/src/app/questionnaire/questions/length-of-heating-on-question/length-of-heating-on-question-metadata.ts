import {ResponseData} from "../../../shared/response-data/response-data";
import {QuestionMetadata} from "../../base-question/question-metadata";
import {QuestionType} from "../question-type";
import {LengthOfHeatingOnQuestionComponent} from "./length-of-heating-on-question.component";

export class LengthOfHeatingOnQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            LengthOfHeatingOnQuestionComponent,
            'length_of_heating_on',
            QuestionType.Heating
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.lengthOfHeatingOn !== undefined;
    }
}
