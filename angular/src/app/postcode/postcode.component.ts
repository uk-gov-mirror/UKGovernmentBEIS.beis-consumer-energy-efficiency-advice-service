import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-postcode',
    templateUrl: './postcode.component.html',
    styleUrls: ['./postcode.component.scss']
})
export class PostcodeComponent implements OnInit {
    static readonly POSTCODE_REGEXP: RegExp = /^[a-zA-Z]{1,2}[0-9][a-zA-Z0-9]?\s?[0-9][a-zA-Z]{2}$/;

    postcodeInput: string;
    shouldDisplayValidationErrorMessage: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    handlePostcodeEntered(): void {
        const isInputEmpty: boolean = !this.postcodeInput;
        const isInputInvalid: boolean = !PostcodeComponent.POSTCODE_REGEXP.test(this.postcodeInput);
        this.shouldDisplayValidationErrorMessage = isInputEmpty || isInputInvalid;
    }
}
