import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';

@Component({
    selector: 'app-tenancy-type-question',
    templateUrl: './tenancy-type-question.component.html',
    styleUrls: ['./tenancy-type-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class TenancyTypeQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return 'test'; // TODO
        // return HouseExposedWall[this.response];
    }

    get response(): boolean {
        return this.responseData.relevantTenancy;
    }

    set response(val: boolean) {
        this.responseData.relevantTenancy = val;
    }
}
