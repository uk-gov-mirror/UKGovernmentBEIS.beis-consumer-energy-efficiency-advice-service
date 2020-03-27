import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';

@Component({
    selector: 'app-loft-clutter-question',
    templateUrl: '../../common-questions/boolean-question/boolean-question.component.html',
    animations: [slideInOutAnimation]
})
export class LoftClutterQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.response ? 'Loft is accessible and clear of clutter' : 'Loft is not accessible and clear of clutter';
    }

    get response(): boolean {
        return this.responseData.isLoftAccessibleAndClearOfClutter;
    }

    set response(val: boolean) {
        this.responseData.isLoftAccessibleAndClearOfClutter = val;
    }
}
