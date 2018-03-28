import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';

@Component({
    selector: 'app-epc-required-question',
    templateUrl: './epc-required-question.component.html',
    styleUrls: ['./epc-required-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class EpcRequiredQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return 'test'; // TODO
        // return HouseExposedWall[this.response];
    }

    get response(): boolean {
        return this.responseData.isEpcRequired;
    }

    set response(val: boolean) {
        this.responseData.isEpcRequired = val;
    }
}
