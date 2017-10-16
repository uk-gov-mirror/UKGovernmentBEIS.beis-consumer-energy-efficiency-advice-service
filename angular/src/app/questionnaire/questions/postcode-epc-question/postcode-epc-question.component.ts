import {Component} from "@angular/core";
import {QuestionBaseComponent, slideInOutAnimation} from '../question.component';

@Component({
    selector: 'app-postcode',
    templateUrl: './postcode-epc-question.component.html',
    styleUrls: ['./postcode-epc-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class PostcodeEpcQuestionComponent extends QuestionBaseComponent<string> {
    static readonly POSTCODE_REGEXP: RegExp = /^[a-zA-Z]{1,2}[0-9][a-zA-Z0-9]?\s?[0-9][a-zA-Z]{2}$/;

    postcodeInput: string;
    shouldDisplayValidationErrorMessage: boolean = false;

    constructor() {
        super();
    }

    ngOnInit() {
        this.postcodeInput = this.response;
    }

    handlePostcodeEntered(): void {
        const isInputEmpty: boolean = !this.postcodeInput;
        const isInputInvalid: boolean = !PostcodeEpcQuestionComponent.POSTCODE_REGEXP.test(this.postcodeInput);
        this.shouldDisplayValidationErrorMessage = isInputEmpty || isInputInvalid;
        if (!this.shouldDisplayValidationErrorMessage) {
            this.response = this.postcodeInput;
        }
    }
}
