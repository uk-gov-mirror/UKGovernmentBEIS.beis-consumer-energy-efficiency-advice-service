import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';

@Component({
    selector: 'app-tenant-consent-question',
    templateUrl: './tenant-consent-question.component.html',
    styleUrls: ['./tenant-consent-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class TenantConsentQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return 'test'; // TODO
        // return HouseExposedWall[this.response];
    }

    get response(): boolean {
        return this.responseData.hasRelevantConsent;
    }

    set response(val: boolean) {
        this.responseData.hasRelevantConsent = val;
    }
}
