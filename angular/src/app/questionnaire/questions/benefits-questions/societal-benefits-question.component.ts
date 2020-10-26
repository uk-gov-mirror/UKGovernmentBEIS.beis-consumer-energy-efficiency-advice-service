import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component} from '@angular/core';

@Component({
    selector: 'app-societal-benefits-question',
    templateUrl: './benefits-question.component.html',
    styleUrls: ['./benefits-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class SocietalBenefitsQuestionComponent extends QuestionBaseComponent {

    benefits = [
        'Child Tax Credit',
        'Working Tax Credit',
        'Disability Living Allowance',
        'Personal Independence Payment (PIP)',
        'Attendance Allowance',
        'Carer\'s Allowance',
        'Severe Disablement Allowance',
        'Industrial Injuries Disablement Benefits'
    ];

    get responseForAnalytics(): string {
        return this.responseData.receiveSocietalBenefits
            ? 'Receive societal benefits'
            : 'Does not receive societal benefits';
    }
    get response(): boolean {
        return this.responseData.receiveSocietalBenefits;
    }

    set response(val: boolean) {
        this.responseData.receiveSocietalBenefits = val;
    }
}
