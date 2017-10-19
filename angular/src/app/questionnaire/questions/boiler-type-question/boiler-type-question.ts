import {QuestionMetadata} from '../../base-question/question-metadata';
import {BoilerTypeQuestionComponent} from './boiler-type-question.component';
import {ResponseData} from '../../response-data/response-data';
import {isGasOrOil} from '../fuel-type-question/fuel-type';
import {QuestionType} from '../../question-type';

export class BoilerTypeQuestion extends QuestionMetadata<boolean, BoilerTypeQuestionComponent> {
    constructor(responseData: ResponseData) {
        super(BoilerTypeQuestionComponent, 'Do you have a condensing boiler?', QuestionType.Heating, responseData);
    }

    get response(): boolean {
        return this.responseData.condensingBoiler;
    }

    set response(val: boolean) {
        this.responseData.condensingBoiler = val;
    }

    isApplicable(): boolean {
        return isGasOrOil(this.responseData.fuelType);
    }
}