import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';

@Component({
    selector: 'app-epc-below-e-question',
    templateUrl: '../../../common-questions/boolean-question/boolean-question.component.html',
    styleUrls: ['../../../common-questions/boolean-question/boolean-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class EpcBelowEQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.response ? 'Property EPC is below E' : 'Property EPC is not below E';
    }

    get response(): boolean {
        return this.responseData.isEpcBelowE;
    }

    set response(val: boolean) {
        this.responseData.isEpcBelowE = val;
    }
}
