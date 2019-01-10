import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component, Inject} from '@angular/core';
import {ResponseData} from '../../../shared/response-data/response-data';

@Component({
    selector: 'app-child-benefits-question',
    templateUrl: './benefits-question.component.html',
    styleUrls: ['./benefits-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class ChildBenefitsQuestionComponent extends QuestionBaseComponent {

    get responseForAnalytics(): string {
        return this.responseData.receiveChildBenefits
            ? 'Receive child benefits'
            : 'Does not receive child benefits';
    }

    get response(): boolean {
        return this.responseData.receiveChildBenefits;
    }

    set response(val: boolean) {
        this.responseData.receiveChildBenefits = val;
    }
}
