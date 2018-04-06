import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';

@Component({
    selector: 'app-tenant-consent-question',
    templateUrl: '../../../common-questions/boolean-question/boolean-question.component.html',
    styleUrls: ['../../../common-questions/boolean-question/boolean-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class TenantConsentQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.response ? 'Has relevant consent' : 'Does not have relevant consent';
    }

    get response(): boolean {
        return this.responseData.hasRelevantConsent;
    }

    set response(val: boolean) {
        this.responseData.hasRelevantConsent = val;
    }
}
