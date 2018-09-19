import {ResponseData} from '../../../shared/response-data/response-data';
import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {DetailedLengthOfHeatingOnQuestionComponent} from './detailed-length-of-heating-on-question.component';
import {FuelType} from "../fuel-type-question/fuel-type";

export class DetailedLengthOfHeatingOnQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            DetailedLengthOfHeatingOnQuestionComponent,
            'detailed_length_of_heating_on',
            QuestionType.Heating
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return !(responseData.fuelType === FuelType.Electricity
            && (responseData.epc && responseData.epc.energyTariff === 'dual'));
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return DetailedLengthOfHeatingOnQuestionComponent.isQuestionAnswered(responseData);
    }
}
