import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component} from '@angular/core';


@Component({
    selector: 'app-income-related-benefits-question',
    templateUrl: './benefits-question.component.html',
    styleUrls: ['./benefits-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class ContributionBasedBenefitsQuestionComponent extends QuestionBaseComponent {

    benefits = [
        'Contribution-Based Jobseeker’s Allowance (JSA)',
        'Contribution-Based Employment and Support Allowance (ESA)'
    ];

    get responseForAnalytics(): string {
        return this.responseData.receiveContributionBasedBenefits
            ? 'Receive contribution based benefits'
            : 'Does not receive contribution based benefits';
    }

    get response(): boolean {
        return this.responseData.receiveContributionBasedBenefits;
    }

    set response(val: boolean) {
        this.responseData.receiveContributionBasedBenefits = val;
        if (val) {
            this.responseData.receiveAnyBenefits = true;
        }
    }
}
