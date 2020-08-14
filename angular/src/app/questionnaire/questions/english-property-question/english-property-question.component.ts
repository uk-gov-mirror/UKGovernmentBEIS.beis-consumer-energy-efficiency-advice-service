import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component} from '@angular/core';

@Component({
    selector: 'app-english-property-question',
    templateUrl: './english-property-question.component.html',
    animations: [slideInOutAnimation]
})
export class EnglishPropertyQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.responseData.englishProperty
            ? 'Property is in England'
            : 'Property is not in England';
    }

    get response(): boolean {
        return this.responseData.englishProperty;
    }

    set response(val: boolean) {
        this.responseData.englishProperty = val;
    }
}
