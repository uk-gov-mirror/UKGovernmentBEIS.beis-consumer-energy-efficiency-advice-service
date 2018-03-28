import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';

@Component({
    selector: 'app-epc-below-e-question',
    templateUrl: './epc-below-e-question.component.html',
    styleUrls: ['./epc-below-e-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class EpcBelowEQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return 'test'; // TODO
        // return HouseExposedWall[this.response];
    }

    get response(): boolean {
        return this.responseData.isEpcBelowE;
    }

    set response(val: boolean) {
        this.responseData.isEpcBelowE = val;
    }
}
