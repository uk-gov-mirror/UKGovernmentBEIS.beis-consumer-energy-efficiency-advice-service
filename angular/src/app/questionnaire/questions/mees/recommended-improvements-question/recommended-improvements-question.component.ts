import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';

@Component({
    selector: 'app-recommended-improvements-question',
    templateUrl: './recommended-improvements-question.component.html',
    styleUrls: ['./recommended-improvements-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class RecommendedImprovementsQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return 'test'; // TODO
        // return HouseExposedWall[this.response];
    }

    get response(): boolean {
        return this.responseData.hasRecommendedImprovements;
    }

    set response(val: boolean) {
        this.responseData.hasRecommendedImprovements = val;
    }
}
