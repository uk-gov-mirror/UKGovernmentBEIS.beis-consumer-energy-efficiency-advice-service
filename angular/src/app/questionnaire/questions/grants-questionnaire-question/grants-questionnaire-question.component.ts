import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component} from '@angular/core';
import {ResponseData} from '../../../shared/response-data/response-data';

@Component({
    selector: 'app-grants-questionnaire-question',
    templateUrl: '../../common-questions/boolean-question/boolean-question.component.html',
    animations: [slideInOutAnimation]
})
export class GrantsQuestionnaireQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.response ? 'Do grants' : 'Do not do grants';
    }

    constructor(responseData: ResponseData) {
        super(responseData);
    }

    get response(): boolean {
        return this.responseData.shouldIncludeGrantsQuestionnaire;
    }

    set response(val: boolean) {
        this.responseData.shouldIncludeGrantsQuestionnaire = val;
    }
}
