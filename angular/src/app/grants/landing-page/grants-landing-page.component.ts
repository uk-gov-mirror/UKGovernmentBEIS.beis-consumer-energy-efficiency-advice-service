import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";

import {ResponseData} from "../../shared/response-data/response-data";
import {UserJourneyType} from "../../shared/response-data/user-journey-type";
import {PostcodeEpcService} from "../../shared/postcode-epc-service/postcode-epc.service";
import {PostcodeDetails} from "../../shared/postcode-epc-service/model/postcode-details";
import {LocalAuthorityService} from "../../shared/local-authority-service/local-authority.service";
import {GrantsEligibilityService} from "../../shared/grants-eligibility/grants-eligibility.service";
import {GrantViewModel} from "../../shared/grant/grant-view-model";

@Component({
    selector: 'app-grants-landing-page',
    templateUrl: './grants-landing-page.component.html',
    styleUrls: ['./grants-landing-page.component.scss']
})
export class GrantsLandingPageComponent {

    postcodeInput: string = '';
    localAuthorityName: string = null;
    availableGrants: GrantViewModel[];
    validationError: boolean = false;
    isLoading: boolean = false;
    isError: boolean = false;

    constructor(
        private responseData: ResponseData,
        private router: Router,
        private postcodeEpcService: PostcodeEpcService,
        private grantsEligibilityService: GrantsEligibilityService,
        private localAuthorityService: LocalAuthorityService
    ) {
    }

    onPostcodeSubmit(): void {
        this.localAuthorityName = null;
        this.availableGrants = null;
        this.validationError = false;
        this.isError = false;
        this.isLoading = true;
        this.postcodeEpcService.fetchPostcodeDetails(this.postcodeInput.replace(/\s/g, ''))
            .subscribe(
                postcodeDetails => this.postcodeSearchCompleted(postcodeDetails),
                err => this.handlePostcodeSearchError(err)
            )
    }

    private postcodeSearchCompleted(postcodeDetails: PostcodeDetails) {
        const localAuthorityCode = postcodeDetails.localAuthorityCode;
        if (!localAuthorityCode) {
            this.isError = true;
            console.error(`No local authority code found for postcode ${ postcodeDetails.postcode }`);
        }
        this.responseData.postcode = postcodeDetails.postcode;
        this.responseData.localAuthorityCode = postcodeDetails.localAuthorityCode;
        Observable.forkJoin(
            this.grantsEligibilityService.getApplicableGrants(),
            this.localAuthorityService.fetchLocalAuthorityName(this.responseData.localAuthorityCode)
        )
            .subscribe(
                ([grants, localAuthorityName]) => {
                    this.availableGrants = grants;
                    this.localAuthorityName = localAuthorityName;
                },
                err => this.handleGrantsCalculationError(err),
                () => this.isLoading = false
            )
    }

    private handleGrantsCalculationError(err): void {
        this.isError = true;
        console.error(err);
    }

    private handlePostcodeSearchError(err): void {
        this.isLoading = false;
        if (err === PostcodeEpcService.POSTCODE_NOT_FOUND) {
            this.validationError = true;
        } else {
            this.isError = true;
            console.error(err);
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