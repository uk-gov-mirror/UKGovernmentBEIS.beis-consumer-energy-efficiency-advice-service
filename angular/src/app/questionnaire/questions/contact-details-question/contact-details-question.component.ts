import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';

@Component({
    selector: 'app-contact-details-question',
    templateUrl: './contact-details-question.component.html',
    styleUrls: ['./contact-details-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class ContactDetailsQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return 'true';
    }

    get name(): string {
        return this.responseData.name || '';
    }

    set name(val: string) {
        this.responseData.name = val;
    }

    get emailAddress(): string {
        return this.responseData.emailAddress || '';
    }

    set emailAddress(val: string) {
        this.responseData.emailAddress = val;
    }

    get phoneNumber(): string {
        return this.responseData.phoneNumber || '';
    }

    set phoneNumber(val: string) {
        this.responseData.phoneNumber = val;
    }

    handleFormSubmit() {
        if (!!this.name && !!this.emailAddress && !!this.phoneNumber) {
            this.complete.emit();
        }
    }
}
