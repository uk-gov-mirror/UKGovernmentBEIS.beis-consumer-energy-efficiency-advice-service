import {QuestionMetadata} from "../../../../base-question/question-metadata";
import {FuelType} from "./fuel-type";
import {FuelTypeQuestionComponent} from "./fuel-type-question.component";
import {QuestionType} from "../../../../question-type";
import {ResponseData} from "../../../../../shared/response-data/response-data";

export class FuelTypeQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            FuelTypeQuestionComponent,
            'fuel_type',
            QuestionType.Heating
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.fuelType !== undefined;
    }
}
