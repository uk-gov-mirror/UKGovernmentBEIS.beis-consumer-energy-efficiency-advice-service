import {Component, ViewChild, ElementRef, OnInit, AfterViewInit} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';

@Component({
    selector: 'app-contact-details-question',
    templateUrl: './contact-details-question.component.html',
    styleUrls: ['./contact-details-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class ContactDetailsQuestionComponent extends QuestionBaseComponent implements OnInit, AfterViewInit {
    @ViewChild('nameInput') nameInputRef: ElementRef;
    @ViewChild('emailAddressInput') emailAddressInputRef: ElementRef;
    @ViewChild('phoneNumberInput') phoneNumberInputElement: ElementRef;

    hasBlurredNameInput: boolean = false;
    hasBlurredEmailAddressInput: boolean = false;
    hasBlurredPhoneNumberInput: boolean = false;

    private inputs: HTMLInputElement[];

    ngOnInit(): void {
        this.inputs = [
            this.nameInputRef,
            this.emailAddressInputRef,
            this.phoneNumberInputElement
        ].map(ref => ref.nativeElement);
    }

    ngAfterViewInit(): void {
        this.updateContactDetailsValidity();
    }

    get responseForAnalytics(): string {
        return '[Contact details are not tracked by analytics]';
    }

    get name(): string {
        return this.responseData.name || '';
    }

    set name(val: string) {
        this.responseData.name = val;
        this.updateContactDetailsValidity();
    }

    get emailAddress(): string {
        return this.responseData.emailAddress || '';
    }

    set emailAddress(val: string) {
        this.responseData.emailAddress = val;
        this.updateContactDetailsValidity();
    }

    get phoneNumber(): string {
        return this.responseData.phoneNumber || '';
    }

    set phoneNumber(val: string) {
        this.responseData.phoneNumber = val;
        this.updateContactDetailsValidity();
    }

    handleFormSubmit() {
        if (this.responseData.hasValidContactDetails) {
            this.complete.emit();
        }
    }

    // Validity is handled this way so that the metadata can decide whether the questions have been answered.
    private updateContactDetailsValidity() {
        this.responseData.hasValidContactDetails = this.inputs.every(input => input.validity.valid);
    }
}
