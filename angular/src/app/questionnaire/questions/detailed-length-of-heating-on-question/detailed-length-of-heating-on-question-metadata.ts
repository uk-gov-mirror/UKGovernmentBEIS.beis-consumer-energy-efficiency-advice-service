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
        return !(responseData.fuelType === FuelType.Electricity && responseData.epc.energyTariff === 'dual');
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return ([1, 2, 5, 6].includes(responseData.heatingPatternType)) ||
            (
                responseData.heatingPatternType === 3 &&
                responseData.morningHeatingStartTime !== undefined &&
                responseData.morningHeatingDuration !== undefined &&
                responseData.eveningHeatingStartTime !== undefined &&
                responseData.eveningHeatingDuration !== undefined
            ) ||
            (
                responseData.heatingPatternType === 4 &&
                responseData.heatingHoursPerDay !== undefined
            );
    }
}
