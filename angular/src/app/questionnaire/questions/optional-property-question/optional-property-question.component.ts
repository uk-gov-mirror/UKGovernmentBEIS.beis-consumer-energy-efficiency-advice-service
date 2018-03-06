import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component} from '@angular/core';
import {ResponseData} from '../../../shared/response-data/response-data';

@Component({
    selector: 'app-optional-property-question',
    templateUrl: './optional-property-question.component.html',
    styleUrls: ['./optional-property-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class OptionalPropertyQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.response ? 'Do optional property questions' : 'Do not do optional property questions';
    }

    constructor(responseData: ResponseData) {
        super(responseData);
    }

    get response(): boolean {
        return this.responseData.shouldIncludeOptionalPropertyQuestions;
    }

    set response(val: boolean) {
        this.responseData.shouldIncludeOptionalPropertyQuestions = val;
    }
}
