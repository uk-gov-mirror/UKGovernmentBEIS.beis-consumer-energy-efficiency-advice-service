import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component} from '@angular/core';

@Component({
    selector: 'app-own-home-question',
    templateUrl: './own-home-question.component.html',
    animations: [slideInOutAnimation]
})
export class OwnHomeQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.responseData.ownsHome
            ? 'Owns home'
            : 'Does not own home';
    }

    get response(): boolean {
        return this.responseData.ownsHome;
    }

    set response(val: boolean) {
        this.responseData.ownsHome = val;
    }
}
