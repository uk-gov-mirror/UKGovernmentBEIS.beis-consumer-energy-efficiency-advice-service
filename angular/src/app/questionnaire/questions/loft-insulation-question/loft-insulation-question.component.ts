import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';

@Component({
    selector: 'app-loft-insulation-question',
    templateUrl: '../../common-questions/boolean-question/boolean-question.component.html',
    animations: [slideInOutAnimation]
})
export class LoftInsulationQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.response ? 'Has loft insulation' : 'Does not have loft insulation';
    }

    get response(): boolean {
        return this.responseData.hasLoftInsulation;
    }

    set response(val: boolean) {
        this.responseData.hasLoftInsulation = val;
    }
}
