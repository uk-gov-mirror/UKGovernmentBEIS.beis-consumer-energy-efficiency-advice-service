import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component, Inject} from '@angular/core';
import {ResponseData} from '../../../shared/response-data/response-data';

@Component({
    selector: 'app-defense-related-benefits-question',
    templateUrl: './benefits-question.component.html',
    styleUrls: ['./benefits-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class DefenseRelatedBenefitsQuestionComponent extends QuestionBaseComponent {

    benefits = [
        'War Pensions Mobility Supplement',
        'Constant Attendance Allowance',
        'Armed Forces Independence Payment'

    ];

    get responseForAnalytics(): string {
        return this.responseData.receiveDefenseRelatedBenefits
            ? 'Receive defense related benefits'
            : 'Does not receive defense related benefits';
    }

    get response(): boolean {
        return this.responseData.receiveDefenseRelatedBenefits;
    }

    set response(val: boolean) {
        this.responseData.receiveDefenseRelatedBenefits = val;
    }
}
