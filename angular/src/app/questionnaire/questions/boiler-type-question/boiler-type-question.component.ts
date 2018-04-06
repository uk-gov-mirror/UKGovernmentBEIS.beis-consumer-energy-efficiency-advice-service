import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';

@Component({
    selector: 'app-boiler-type-question',
    templateUrl: '../../common-questions/boolean-question/boolean-question.component.html',
    styleUrls: ['../../common-questions/boolean-question/boolean-question.component.scss'],
    animations: [slideInOutAnimation],
})
export class BoilerTypeQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.response ? 'Condensing' : 'Non-condensing';
    }

    get response(): boolean {
        return this.responseData.condensingBoiler;
    }

    set response(val: boolean) {
        this.responseData.condensingBoiler = val;
    }
}
