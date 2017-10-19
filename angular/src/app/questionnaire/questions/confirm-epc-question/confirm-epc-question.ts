import {ConfirmEpcQuestionComponent} from './confirm-epc-question.component';
import {Question} from '../question';
import {ResponseData} from '../response-data';
import {Epc} from '../postcode-epc-question/model/epc';
import {QuestionType} from '../../question-type';
import {EpcConfirmation} from './epc-confirmation';

export class ConfirmEpcQuestion extends Question<EpcConfirmation, ConfirmEpcQuestionComponent> {
    private isQuestionAnswered: boolean = false;

    constructor(responseData: ResponseData) {
        super(ConfirmEpcQuestionComponent, 'Here\'s what we know so far...', QuestionType.User, responseData);
    }

    get response(): EpcConfirmation {
        const epcConfirmation = {
            homeType: this.responseData.homeType,
            fuelType: this.responseData.fuelType,
            electricityTariff: this.responseData.electricityTariff
        };
        return this.isQuestionAnswered ? epcConfirmation : undefined;
    }

    set response(val: EpcConfirmation) {
        this.isQuestionAnswered = true;
        this.responseData.homeType = val.homeType;
        this.responseData.fuelType = val.fuelType;
        this.responseData.electricityTariff = val.electricityTariff;
    }
}