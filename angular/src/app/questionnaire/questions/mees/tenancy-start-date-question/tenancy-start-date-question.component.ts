import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';
import {getDomesticTenancyStartDateDescription, TenancyStartDate} from './tenancy-start-date';
import {MultipleChoiceOption} from "../../../common-questions/multiple-choice-question/multiple-choice-option";

class StartDateOption implements MultipleChoiceOption {
    public readonly name: string;

    constructor(public readonly value: TenancyStartDate, public readonly className: string) {
        this.name = getDomesticTenancyStartDateDescription(value);
    }
}

@Component({
    selector: 'app-tenancy-start-date-question',
    templateUrl: './tenancy-start-date-question.component.html',
    animations: [slideInOutAnimation]
})
export class TenancyStartDateQuestionComponent extends QuestionBaseComponent {
    options = [
        new StartDateOption(TenancyStartDate.BeforeApril2018, 'before-2018'),
        new StartDateOption(TenancyStartDate.AfterApril2018, 'after-2018'),
    ];

    get responseForAnalytics(): string {
        return TenancyStartDate[this.response];
    }

    get response(): TenancyStartDate {
        return this.responseData.tenancyStartDate;
    }

    set response(val: TenancyStartDate) {
        this.responseData.tenancyStartDate = val;
    }
}
