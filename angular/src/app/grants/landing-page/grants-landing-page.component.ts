import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {ResponseData} from "../../shared/response-data/response-data";
import {UserJourneyType} from "../../shared/response-data/user-journey-type";
import {PostcodeValidationService} from "../../shared/postcode-validation-service/postcode-validation.service";

@Component({
    selector: 'app-grants-landing-page',
    templateUrl: './grants-landing-page.component.html',
    styleUrls: ['./grants-landing-page.component.scss']
})
export class GrantsLandingPageComponent {

    postcodeInput: string;
    validationError: boolean = false;

    constructor(
        private responseData: ResponseData,
        private router: Router,
        private postcodeValidationService: PostcodeValidationService
    ) {
    }

    onPostcodeSubmit(): void {
        this.postcodeInput = this.postcodeInput.trim();
        this.validationError = !this.postcodeValidationService.isValid(this.postcodeInput);
        if (!this.validationError) {
            this.responseData.postcode = this.postcodeInput;
            // TODO: add local authority grant-fetching logic here (BEISDEAS-88)
            console.log(`Search for postcode "${ this.postcodeInput }"`);
        }
    }

    setJourneyTypeToBoiler(): void {
        this.responseData.userJourneyType = UserJourneyType.Boiler;
    }

    setJourneyTypeToHomeImprovements(): void {
        this.responseData.userJourneyType = UserJourneyType.PlanHomeImprovements;
    }
}