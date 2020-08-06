import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {PostcodeEpcService} from '../../../shared/postcode-epc-service/postcode-epc.service';
import {PostcodeDetails} from '../../../shared/postcode-epc-service/model/postcode-details';
import {Country} from "../postcode-epc-question/country";

@Component({
    selector: 'app-country-postcode-question',
    templateUrl: './country-postcode-question.component.html',
    styleUrls: ['./country-postcode-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class CountryPostcodeQuestionComponent extends QuestionBaseComponent implements OnInit {
    static readonly ERROR_VALIDATION: string = 'Please enter a full valid UK postcode';

    postcodeInput: string;
    shouldDisplayLoadingSpinner: boolean;
    validationError: string;

    get responseForAnalytics(): string {
        return this.responseData.country
            ? `Country: ${Country[this.responseData.country]}`
            : "Country not found";
    }

    constructor(responseData: ResponseData,
                private postcodeEpcService: PostcodeEpcService) {
        super(responseData);
    }

    ngOnInit() {
        this.postcodeInput = this.postcode;
    }

    get postcode(): string {
        return this.responseData.postcode;
    }

    set postcode(val: string) {
        this.responseData.postcode = val;
    }

    get country(): Country {
        return this.responseData.country;
    }

    set country(val: Country) {
        this.responseData.country = val;
    }

    get localAuthorityCode(): string {
        return this.responseData.localAuthorityCode;
    }

    set localAuthorityCode(val: string) {
        this.responseData.localAuthorityCode = val;
    }

    handlePostcodeEntered(): void {
        if (this.postcodeInput) {
            this.postcodeInput = this.postcodeInput.replace(/\s/g, '');
            this.validationError = null;
            this.shouldDisplayLoadingSpinner = true;
            this.postcodeEpcService.fetchPostcodeDetails(this.postcodeInput)
                .subscribe(
                    postcodeDetails => this.handlePostcodeDetails(postcodeDetails),
                    () => this.displayPostcodeValidationError()
                );
        }
    }

    private displayPostcodeValidationError(): void {
        this.shouldDisplayLoadingSpinner = false;
        this.validationError = null;
        this.validationError = CountryPostcodeQuestionComponent.ERROR_VALIDATION;
    }

    private handlePostcodeDetails(postcodeDetails: PostcodeDetails): void {
        this.localAuthorityCode = postcodeDetails.localAuthorityCode;
        this.postcode = postcodeDetails.postcode;
        this.country = postcodeDetails.country;
        this.shouldDisplayLoadingSpinner = false;
        this.complete.emit();
    }
}
