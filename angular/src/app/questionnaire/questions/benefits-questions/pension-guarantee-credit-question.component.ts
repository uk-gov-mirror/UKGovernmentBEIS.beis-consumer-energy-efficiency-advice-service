import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component} from '@angular/core';
import {ResponseData} from '../../../shared/response-data/response-data';

@Component({
    selector: 'app-pension-guarantee-credit-question',
    templateUrl: './benefits-question.component.html',
    styleUrls: ['./benefits-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class PensionGuaranteeCreditQuestionComponent extends QuestionBaseComponent {

    benefits = [];

    get responseForAnalytics(): string {
        return this.responseData.receivePensionGuaranteeCredit
            ? 'Receive pension guarantee credit'
            : 'Does not receive pension guarantee credit';
    }

    constructor(responseData: ResponseData) {
        super(responseData);
    }

    get response(): boolean {
        return this.responseData.receivePensionGuaranteeCredit;
    }

    set response(val: boolean) {
        this.responseData.receivePensionGuaranteeCredit = val;
        if (val) {
            this.responseData.receiveAnyBenefits = true;
        }
    }
}
