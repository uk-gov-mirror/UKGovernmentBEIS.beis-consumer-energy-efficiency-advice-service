import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";

import {ResponseData} from "../../shared/response-data/response-data";
import {UserJourneyType} from "../../shared/response-data/user-journey-type";
import {PostcodeEpcService} from "../../shared/postcode-epc-service/postcode-epc.service";
import {PostcodeDetails} from "../../shared/postcode-epc-service/model/postcode-details";
import {LocalAuthorityService} from "../../shared/local-authority-service/local-authority.service";
import {LocalAuthority} from "../../shared/local-authority-service/local-authority";

@Component({
    selector: 'app-grants-landing-page',
    templateUrl: './grants-landing-page.component.html',
    styleUrls: ['./grants-landing-page.component.scss']
})
export class GrantsLandingPageComponent {

    localAuthority: LocalAuthority = null;
    validationError: boolean = false;
    isLoading: boolean = false;
    isError: boolean = false;

    constructor(private responseData: ResponseData) {
    }

    setJourneyTypeToBoiler(): void {
        this.responseData.userJourneyType = UserJourneyType.Boiler;
    }

    setJourneyTypeToHomeImprovements(): void {
        this.responseData.userJourneyType = UserJourneyType.PlanHomeImprovements;
    }

    onPostcodeSelected() {
        alert(`show grants for ${this.responseData.localAuthorityCode}`);
    }
}
