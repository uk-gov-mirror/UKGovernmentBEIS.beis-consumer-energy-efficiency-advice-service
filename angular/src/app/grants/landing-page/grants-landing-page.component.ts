import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {ResponseData} from "../../shared/response-data/response-data";
import {UserJourneyType} from "../../shared/response-data/user-journey-type";
import {PostcodeEpcService} from "../../shared/postcode-epc-service/postcode-epc.service";

@Component({
    selector: 'app-grants-landing-page',
    templateUrl: './grants-landing-page.component.html',
    styleUrls: ['./grants-landing-page.component.scss']
})
export class GrantsLandingPageComponent {

    postcodeInput: string;
    validationError: boolean = false;
    isLoading: boolean = false;
    isError: boolean = false;

    constructor(
        private responseData: ResponseData,
        private router: Router,
        private postcodeEpcService: PostcodeEpcService
    ) {
    }

    onPostcodeSubmit(): void {
        this.postcodeInput = this.postcodeInput.trim();
        this.validationError = !PostcodeEpcService.isValidPostcode(this.postcodeInput);
        if (!this.validationError) {
            this.responseData.postcode = this.postcodeInput;
            this.isLoading = true;
            console.log(`Search for postcode "${ this.postcodeInput }"`);
        }
    }

    enterBoilerJourney(): void {
        this.responseData.userJourneyType = UserJourneyType.Boiler;
        this.router.navigate(['/js/boiler']);
    }

    enterHomeImprovementsJourney(): void {
        this.responseData.userJourneyType = UserJourneyType.PlanHomeImprovements;
        this.router.navigate(['/js/energy-efficiency/questionnaire/home-basics']);
    }
}