import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';

@Component({
    selector: 'app-improvements-at-no-cost-question',
    templateUrl: '../../../common-questions/boolean-question/boolean-question.component.html',
    styleUrls: ['../../../common-questions/boolean-question/boolean-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class ImprovementsAtNoCostQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.response ? 'Has improvements at no cost' : 'Does not have improvements at no cost';
    }

    get response(): boolean {
        return this.responseData.hasImprovementsAtNoCost;
    }

    set response(val: boolean) {
        this.responseData.hasImprovementsAtNoCost = val;
    }
}
