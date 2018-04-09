import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';

@Component({
    selector: 'app-domestic-property-after-2018-question',
    templateUrl: '../../../common-questions/boolean-question/boolean-question.component.html',
    styleUrls: ['../../../common-questions/boolean-question/boolean-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class DomesticPropertyAfter2018QuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.response ? 'Will rent domestic property after 2018' : 'Will not rent domestic property after 2018';
    }

    get response(): boolean {
        return this.responseData.isDomesticPropertyAfter2018;
    }

    set response(val: boolean) {
        this.responseData.isDomesticPropertyAfter2018 = val;
    }
}
