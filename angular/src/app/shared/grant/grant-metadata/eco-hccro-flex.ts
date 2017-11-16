import {NationalGrantMetadata} from "../national-grant-metadata";
import {ResponseData} from "../../response-data/response-data";
import {GrantEligibility} from "../../grants-eligibility/grant-eligibility";
import {LocalAuthorityService} from "../../local-authority-service/local-authority.service";
import {Observable} from "rxjs/Observable";

export class EcoHhcroFlex extends NationalGrantMetadata {

    constructor(private localAuthorityService: LocalAuthorityService) {
        super('eco-hhcro-flex');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        return this.localAuthorityService.fetchLocalAuthorityEcoFlexStatus(responseData.localAuthorityCode)
            .map(isEcoFlexActive => isEcoFlexActive ? GrantEligibility.MayBeEligible : GrantEligibility.Ineligible);
    }
}