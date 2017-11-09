import {QuestionMetadata} from "../../base-question/question-metadata";
import {BoilerTypeQuestionComponent} from "./boiler-type-question.component";
import {ResponseData} from "../../../shared/response-data/response-data";
import {isGasOrOil} from "../fuel-type-question/fuel-type";
import {QuestionType} from "../question-type";

export class BoilerTypeQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            BoilerTypeQuestionComponent,
            'boiler_type',
            QuestionType.Heating
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.fuelType == undefined || isGasOrOil(responseData.fuelType);
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.condensingBoiler !== undefined;
    }
}
