import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component} from '@angular/core';


@Component({
    selector: 'app-income-related-benefits-question',
    templateUrl: './benefits-question.component.html',
    styleUrls: ['./benefits-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class HousingBenefitQuestionComponent extends QuestionBaseComponent {

    benefits = [
        'Housing benefit'
    ];

    get responseForAnalytics(): string {
        return this.responseData.receiveHousingBenefit
            ? 'Receive housing benefits'
            : 'Does not receive housing benefits';
    }

    get response(): boolean {
        return this.responseData.receiveHousingBenefit;
    }

    set response(val: boolean) {
        this.responseData.receiveHousingBenefit = val;
    }
}
