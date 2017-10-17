import {ElectricityTariff} from "./electricity-tariff";
import {ElectricityTariffQuestionComponent} from "./electricity-tariff-question.component";
import {ResponseData} from "../response-data";
import {Question} from "../question";

export class ElectricityTariffQuestion extends Question<ElectricityTariff, ElectricityTariffQuestionComponent> {
    constructor(responseData: ResponseData) {
        super(ElectricityTariffQuestionComponent, 'Do you know your electricity tariff?', responseData);
    }

    get response(): ElectricityTariff {
        return this.responseData.electricityTariff;
    }

    set response(val: ElectricityTariff) {
        this.responseData.electricityTariff = val;
    }
}