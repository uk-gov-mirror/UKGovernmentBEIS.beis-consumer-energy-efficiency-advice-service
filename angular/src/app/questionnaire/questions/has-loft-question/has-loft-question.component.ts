import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';

@Component({
    selector: 'app-has-loft-question',
    templateUrl: '../../common-questions/boolean-question/boolean-question.component.html',
    animations: [slideInOutAnimation]
})
export class HasLoftQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.response ? 'Has loft' : 'Does not have loft';
    }

    get response(): boolean {
        return this.responseData.hasLoft;
    }

    set response(val: boolean) {
        this.responseData.hasLoft = val;
    }
}
