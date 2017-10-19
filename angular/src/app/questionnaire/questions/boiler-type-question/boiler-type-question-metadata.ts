import {QuestionMetadata} from '../../base-question/question-metadata';
import {BoilerTypeQuestionComponent} from './boiler-type-question.component';
import {ResponseData} from '../../../response-data/response-data';
import {isGasOrOil} from '../fuel-type-question/fuel-type';
import {QuestionType} from '../../question-type';

export class BoilerTypeQuestionMetadata extends QuestionMetadata<boolean> {
    constructor() {
        super(
            BoilerTypeQuestionComponent,
            'boiler-type',
            QuestionType.Heating
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.fuelType == null || isGasOrOil(responseData.fuelType);
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.fuelType != null;
    }
}
