import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';

@Component({
    selector: 'app-domestic-property-after-2018-question',
    templateUrl: './domestic-property-after-2018-question.component.html',
    styleUrls: ['./domestic-property-after-2018-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class DomesticPropertyAfter2018QuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return 'test'; // TODO
        // return HouseExposedWall[this.response];
    }

    get response(): boolean {
        return this.responseData.isDomesticPropertyAfter2018;
    }

    set response(val: boolean) {
        this.responseData.isDomesticPropertyAfter2018 = val;
    }
}
