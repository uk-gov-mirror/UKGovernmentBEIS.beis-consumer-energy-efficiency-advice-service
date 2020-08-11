import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component} from '@angular/core';


@Component({
    selector: 'app-housing-benefit-question',
    templateUrl: './benefits-question.component.html',
    styleUrls: ['./benefits-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class HousingBenefitQuestionComponent extends QuestionBaseComponent {

    benefits = [];

    get responseForAnalytics(): string {
        return this.responseData.receiveHousingBenefit
            ? 'Receive housing benefit'
            : 'Does not receive housing benefit';
    }

    get response(): boolean {
        return this.responseData.receiveHousingBenefit;
    }

    set response(val: boolean) {
        this.responseData.receiveHousingBenefit = val;
    }
}
