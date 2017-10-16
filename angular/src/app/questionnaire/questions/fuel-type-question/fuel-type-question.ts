import {Question} from "../question";
import {ResponseData} from "../response-data";
import {FuelType} from './fuel-type';
import {FuelTypeQuestionComponent} from './fuel-type-question.component';
import {QuestionType} from '../../question-type';

export class FuelTypeQuestion extends Question<FuelType, FuelTypeQuestionComponent> {
    constructor(responseData: ResponseData) {
        super(FuelTypeQuestionComponent, 'Which type of fuel supplies your heating?', QuestionType.Heating, responseData);
    }

    get response(): FuelType {
        return this.responseData.fuelType;
    }

    set response(val: FuelType) {
        this.responseData.fuelType = val;
    }
}