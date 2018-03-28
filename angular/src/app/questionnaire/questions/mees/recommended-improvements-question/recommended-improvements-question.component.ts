import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';

@Component({
    selector: 'app-recommended-improvements-question',
    templateUrl: '../../../common-questions/boolean-question/boolean-question.component.html',
    styleUrls: ['../../../common-questions/boolean-question/boolean-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class RecommendedImprovementsQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.response ? 'Has recommended improvements' : 'Does not have recommended improvements';
    }

    get response(): boolean {
        return this.responseData.hasRecommendedImprovements;
    }

    set response(val: boolean) {
        this.responseData.hasRecommendedImprovements = val;
    }
}
