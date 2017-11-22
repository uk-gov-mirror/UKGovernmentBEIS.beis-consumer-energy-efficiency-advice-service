import {NationalGrantCalculator} from "../../national-grant-calculator";
import {ResponseData} from "../../../../shared/response-data/response-data";
import {GrantEligibility} from "../../../grant-eligibility-service/grant-eligibility";
import {LocalAuthorityService} from "../../../../shared/local-authority-service/local-authority.service";
import {Observable} from "rxjs/Observable";

export class EcoHhcroFlex extends NationalGrantCalculator {

    constructor(private localAuthorityService: LocalAuthorityService) {
        super('eco-hhcro-flex');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        return this.localAuthorityService.fetchLocalAuthorityDetails(responseData.localAuthorityCode)
            .map(response => response.isEcoFlexActive ? GrantEligibility.MayBeEligible : GrantEligibility.Ineligible);
    }

    getAnnualPaymentPounds(resposeData: ResponseData): Observable<number> {
        return Observable.of(null);
    }
}