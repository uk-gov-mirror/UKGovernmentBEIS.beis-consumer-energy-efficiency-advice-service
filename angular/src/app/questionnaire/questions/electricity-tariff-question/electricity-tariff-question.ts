import {ElectricityTariff} from './electricity-tariff';
import {ElectricityTariffQuestionComponent} from './electricity-tariff-question.component';
import {ResponseData} from '../../response-data/response-data';
import {QuestionMetadata} from '../../base-question/question-metadata';
import {isElectric} from '../fuel-type-question/fuel-type';
import {QuestionType} from '../../question-type';

export class ElectricityTariffQuestion extends QuestionMetadata<ElectricityTariff, ElectricityTariffQuestionComponent> {
    constructor(responseData: ResponseData) {
        super(ElectricityTariffQuestionComponent, 'Do you know your electricity tariff?', QuestionType.Heating, responseData);
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