import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ResponseData} from '../../shared/response-data/response-data';
import {UserJourneyType} from '../../shared/response-data/user-journey-type';
import {PostcodeEpcService} from '../../shared/postcode-epc-service/postcode-epc.service';
import {PostcodeDetails} from '../../shared/postcode-epc-service/model/postcode-details';
import {LocalAuthorityService} from '../../shared/local-authority-service/local-authority.service';
import {LocalAuthority} from '../../shared/local-authority-service/local-authority';

@Component({
    selector: 'app-grants-landing-page',
    templateUrl: './grants-landing-page.component.html',
    styleUrls: ['./grants-landing-page.component.scss']
})
export class GrantsLandingPageComponent {

    postcodeInput: string = '';
    localAuthority: LocalAuthority = null;
    validationError: boolean = false;
    isLoading: boolean = false;
    isError: boolean = false;

    constructor(
        private responseData: ResponseData,
        private postcodeEpcService: PostcodeEpcService,
        private localAuthorityService: LocalAuthorityService
    ) {
    }

    onPostcodeSubmit(): void {
        this.localAuthority = null;
        this.validationError = false;
        this.isError = false;
        this.isLoading = true;
        this.postcodeEpcService.fetchPostcodeDetails(this.postcodeInput.replace(/\s/g, ''))
            .subscribe(
                postcodeDetails => this.postcodeSearchCompleted(postcodeDetails),
                err => this.handlePostcodeSearchError(err)
            );
    }

    setJourneyTypeToBoiler(): void {
        this.responseData.userJourneyType = UserJourneyType.Boiler;
    }

    setJourneyTypeToHomeImprovements(): void {
        this.responseData.userJourneyType = UserJourneyType.PlanHomeImprovements;
    }

    private postcodeSearchCompleted(postcodeDetails: PostcodeDetails) {
        const localAuthorityCode = postcodeDetails.localAuthorityCode;
        if (!localAuthorityCode) {
            this.isError = true;
            console.error(`No local authority code found for postcode ${ postcodeDetails.postcode }`);
        }
        this.responseData.postcode = postcodeDetails.postcode;
        this.responseData.localAuthorityCode = postcodeDetails.localAuthorityCode;
        this.localAuthorityService.fetchLocalAuthorityDetails(this.responseData.localAuthorityCode)
            .subscribe(
                response => this.handleLocalAuthorityResponse(response),
                err => this.handleLocalAuthorityServiceError(err),
            );
    }

    private handleLocalAuthorityResponse(localAuthority: LocalAuthority): void {
        this.localAuthority = localAuthority;
        this.isLoading = false;
    }

    private handleLocalAuthorityServiceError(err): void {
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
}
