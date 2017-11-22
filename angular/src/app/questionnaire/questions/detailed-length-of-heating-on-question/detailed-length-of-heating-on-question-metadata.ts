import {ResponseData} from "../../../shared/response-data/response-data";
import {QuestionMetadata} from "../../base-question/question-metadata";
import {QuestionType} from "../question-type";
import {DetailedLengthOfHeatingOnQuestionComponent} from "./detailed-length-of-heating-on-question.component";

export class DetailedLengthOfHeatingOnQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            DetailedLengthOfHeatingOnQuestionComponent,
            'detailed_length_of_heating_on',
            QuestionType.Heating
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.detailedLengthOfHeatingOnEarlyHours !== undefined &&
            responseData.detailedLengthOfHeatingOnMorning !== undefined &&
            responseData.detailedLengthOfHeatingOnAfternoon !== undefined &&
            responseData.detailedLengthOfHeatingOnEvening !== undefined;
    }
}
