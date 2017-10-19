import {QuestionMetadata} from '../../base-question/question-metadata';
import {BoilerTypeQuestionComponent} from './boiler-type-question.component';
import {ResponseData} from '../../response-data/response-data';
import {isGasOrOil} from '../fuel-type-question/fuel-type';
import {QuestionType} from '../../question-type';

export class BoilerTypeQuestionMetadata extends QuestionMetadata<boolean> {
    constructor() {
        super(
            BoilerTypeQuestionComponent,
            'Do you have a condensing boiler?',
            QuestionType.Heating
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return isGasOrOil(responseData.fuelType);
    }
}
