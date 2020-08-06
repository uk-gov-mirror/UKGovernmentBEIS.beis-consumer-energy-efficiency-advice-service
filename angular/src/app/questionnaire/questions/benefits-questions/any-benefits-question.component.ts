import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component} from '@angular/core';

@Component({
    selector: 'app-any-benefits-question',
    templateUrl: './benefits-question.component.html',
    styleUrls: ['./benefits-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class AnyBenefitsQuestionComponent extends QuestionBaseComponent {

    benefits = [];

    get responseForAnalytics(): string {
        return this.responseData.receiveAnyBenefits
            ? 'Receive benefits'
            : 'Does not receive benefits';
    }

    get response(): boolean {
        return this.responseData.receiveAnyBenefits;
    }

    set response(val: boolean) {
        this.responseData.receiveAnyBenefits = val;
    }
}
