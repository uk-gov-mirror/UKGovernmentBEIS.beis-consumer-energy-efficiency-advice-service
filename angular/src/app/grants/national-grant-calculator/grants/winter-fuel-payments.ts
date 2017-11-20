import {NationalGrantCalculator} from "../national-grant-calculator";
import {GrantEligibility} from "../../grant-eligibility-service/grant-eligibility";
import {ResponseData} from "../../../shared/response-data/response-data";
import {Observable} from "rxjs/Observable";

export class WinterFuelPayments extends NationalGrantCalculator {
    constructor() {
        super('winter-fuel-payments');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        const isEligible = responseData.numberOfAdultsAged64To80 > 0 ||
            responseData.numberOfAdultsAgedOver80 > 0;
        return Observable.of(isEligible ? GrantEligibility.LikelyEligible : GrantEligibility.Ineligible);
    }
}