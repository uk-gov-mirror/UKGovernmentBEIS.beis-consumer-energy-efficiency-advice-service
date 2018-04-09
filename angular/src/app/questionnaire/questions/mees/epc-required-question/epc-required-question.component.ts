import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';

@Component({
    selector: 'app-epc-required-question',
    templateUrl: '../../../common-questions/boolean-question/boolean-question.component.html',
    styleUrls: ['../../../common-questions/boolean-question/boolean-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class EpcRequiredQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.response ? 'Property EPC is required' : 'Property EPC is not required';
    }

    get response(): boolean {
        return this.responseData.isEpcRequired;
    }

    set response(val: boolean) {
        this.responseData.isEpcRequired = val;
    }
}
