import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';

@Component({
    selector: 'app-has-loft-question',
    templateUrl: '../../common-questions/boolean-question/boolean-question.component.html',
    styleUrls: ['../../common-questions/boolean-question/boolean-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class LoftWaterDamageQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.response ? 'Loft has history of water damage' : 'Loft has no history of water damage';
    }

    get response(): boolean {
        return this.responseData.hasLoftHistoryOfWaterDamage;
    }

    set response(val: boolean) {
        this.responseData.hasLoftHistoryOfWaterDamage = val;
    }
}
