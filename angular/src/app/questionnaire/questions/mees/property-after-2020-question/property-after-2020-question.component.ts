import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';

@Component({
    selector: 'app-property-after-2020-question',
    templateUrl: './property-after-2020-question.component.html',
    styleUrls: ['./property-after-2020-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class PropertyAfter2020QuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return 'test'; // TODO
        // return HouseExposedWall[this.response];
    }

    get response(): boolean {
        return this.responseData.isPropertyAfter2020;
    }

    set response(val: boolean) {
        this.responseData.isPropertyAfter2020 = val;
    }
}
