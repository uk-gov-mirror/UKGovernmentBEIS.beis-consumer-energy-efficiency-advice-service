import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component} from '@angular/core';

@Component({
    selector: 'app-outside-space-question',
    templateUrl: './outside-space-question.component.html',
    animations: [slideInOutAnimation]
})
export class OutsideSpaceQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.responseData.hasOutsideSpace
            ? 'Property has outside space'
            : 'Property does not have outside space';
    }

    get response(): boolean {
        return this.responseData.hasOutsideSpace;
    }

    set response(val: boolean) {
        this.responseData.hasOutsideSpace = val;
    }
}
