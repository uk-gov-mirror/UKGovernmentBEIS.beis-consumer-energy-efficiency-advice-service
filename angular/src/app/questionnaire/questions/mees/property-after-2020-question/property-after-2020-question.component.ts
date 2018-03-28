import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';

@Component({
    selector: 'app-property-after-2020-question',
    templateUrl: '../../../common-questions/boolean-question/boolean-question.component.html',
    styleUrls: ['../../../common-questions/boolean-question/boolean-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class PropertyAfter2020QuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.response ? 'Will rent property after 2020' : 'Will not rent property after 2020';
    }

    get response(): boolean {
        return this.responseData.isPropertyAfter2020;
    }

    set response(val: boolean) {
        this.responseData.isPropertyAfter2020 = val;
    }
}
