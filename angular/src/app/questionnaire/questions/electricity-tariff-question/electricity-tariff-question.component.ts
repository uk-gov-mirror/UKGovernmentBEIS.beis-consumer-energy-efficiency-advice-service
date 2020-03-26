import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {ElectricityTariff} from './electricity-tariff';
import {ResponseData} from "../../../shared/response-data/response-data";
import {MultipleChoiceOption} from "../../common-questions/multiple-choice-question/multiple-choice-option";

@Component({
    selector: 'app-electricity-tariff-question',
    templateUrl: './electricity-tariff-question.component.html',
    animations: [slideInOutAnimation],
})
export class ElectricityTariffQuestionComponent extends QuestionBaseComponent {
    electricityTariffOptions: MultipleChoiceOption[];
    ElectricityTariff: typeof ElectricityTariff = ElectricityTariff;

    constructor(responseData: ResponseData) {
        super(responseData);
        this.electricityTariffOptions = [
            { name: 'Standard', value: ElectricityTariff.Standard, className: 'standard-button' },
            { name: 'Off Peak', value: ElectricityTariff.OffPeak, className: 'off-peak-button' }
        ];
    }

    get responseForAnalytics(): string {
        return ElectricityTariff[this.response];
    }

    get response(): ElectricityTariff {
        return this.responseData.electricityTariff;
    }

    set response(val: ElectricityTariff) {
        this.responseData.electricityTariff = val;
    }
}
