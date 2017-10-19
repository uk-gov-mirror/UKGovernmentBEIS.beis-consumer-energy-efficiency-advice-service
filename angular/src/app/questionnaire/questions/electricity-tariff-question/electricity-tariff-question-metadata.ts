import {ElectricityTariff} from './electricity-tariff';
import {ElectricityTariffQuestionComponent} from './electricity-tariff-question.component';
import {ResponseData} from '../../../response-data/response-data';
import {QuestionMetadata} from '../../base-question/question-metadata';
import {isElectric} from '../fuel-type-question/fuel-type';
import {QuestionType} from '../../question-type';

export class ElectricityTariffQuestionMetadata extends QuestionMetadata<ElectricityTariff> {
    constructor() {
        super(
            ElectricityTariffQuestionComponent,
            'Do you know your electricity tariff?',
            QuestionType.Heating
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return isElectric(responseData.fuelType);
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.electricityTariff !== undefined;
    }
}
