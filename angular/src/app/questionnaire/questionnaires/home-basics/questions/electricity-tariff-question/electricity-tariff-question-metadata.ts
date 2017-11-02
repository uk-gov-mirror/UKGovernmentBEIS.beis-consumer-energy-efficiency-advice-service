import {ElectricityTariff} from "./electricity-tariff";
import {ElectricityTariffQuestionComponent} from "./electricity-tariff-question.component";
import {ResponseData} from "../../../../../shared/response-data/response-data";
import {QuestionMetadata} from "../../../../base-question/question-metadata";
import {isElectric} from "../fuel-type-question/fuel-type";
import {QuestionType} from "../../../../question-type";

export class ElectricityTariffQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            ElectricityTariffQuestionComponent,
            'electricity_tariff',
            QuestionType.Heating
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.fuelType == null || isElectric(responseData.fuelType);
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.electricityTariff != null;
    }
}
