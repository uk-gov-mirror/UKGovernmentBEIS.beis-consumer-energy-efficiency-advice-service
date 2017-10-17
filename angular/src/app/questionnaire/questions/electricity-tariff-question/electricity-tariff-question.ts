import {ElectricityTariff} from "./electricity-tariff";
import {ElectricityTariffQuestionComponent} from "./electricity-tariff-question.component";
import {ResponseData} from "../response-data";
import {Question} from "../question";
import {FuelType, isElectric} from "../fuel-type-question/fuel-type";

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

    isApplicable(): boolean {
        return isElectric(this.responseData.fuelType);
    }
}