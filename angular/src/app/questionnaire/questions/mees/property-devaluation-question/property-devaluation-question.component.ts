import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';

@Component({
    selector: 'app-property-devaluation-question',
    templateUrl: '../../../common-questions/boolean-question/boolean-question.component.html',
    styleUrls: ['../../../common-questions/boolean-question/boolean-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class PropertyDevaluationQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.response ? 'Property will be devalued' : 'Property will not be devalued';
    }

    get response(): boolean {
        return this.responseData.willPropertyBeDevalued;
    }

    set response(val: boolean) {
        this.responseData.willPropertyBeDevalued = val;
    }
}
