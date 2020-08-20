import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component, Inject} from '@angular/core';
import {ResponseData} from '../../../shared/response-data/response-data';

@Component({
    selector: 'app-income-related-benefits-question',
    templateUrl: './benefits-question.component.html',
    styleUrls: ['./benefits-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class IncomeRelatedBenefitsQuestionComponent extends QuestionBaseComponent {

    benefits = [
        'Income Support',
        'Income-Based Jobseeker’s Allowance (JSA)',
        'Income-Based Employment and Support Allowance (ESA)',
        'Universal Credit'
    ];

    get responseForAnalytics(): string {
        return this.responseData.receiveIncomeRelatedBenefits
            ? 'Receive income related benefits'
            : 'Does not receive income related benefits';
    }

    get response(): boolean {
        return this.responseData.receiveIncomeRelatedBenefits;
    }

    set response(val: boolean) {
        this.responseData.receiveIncomeRelatedBenefits = val;
        if (val) {
            this.responseData.receiveAnyBenefits = true;
        }
    }
}
