import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';

@Component({
    selector: 'app-temporary-exclusions-question',
    templateUrl: '../../../common-questions/boolean-question/boolean-question.component.html',
    styleUrls: ['../../../common-questions/boolean-question/boolean-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class TemporaryExclusionsQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.response ? 'Has temporary exclusions' : 'Does not have temporary exclusions';
    }

    get response(): boolean {
        return this.responseData.hasTemporaryExclusions;
    }

    set response(val: boolean) {
        this.responseData.hasTemporaryExclusions = val;
    }
}
