import {NationalGrantMetadata} from "../national-grant-metadata";
import {GrantEligibility} from "../../grants-eligibility/grant-eligibility";
import {ResponseData} from "../../response-data/response-data";
import {Observable} from "rxjs/Observable";

export class WinterFuelPayments extends NationalGrantMetadata {
    constructor() {
        super('winter-fuel-payments');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        const isEligible = responseData.numberOfAdultsAged64To80 > 0 ||
            responseData.numberOfAdultsAgedOver80 > 0;
        return Observable.of(isEligible ? GrantEligibility.LikelyEligible : GrantEligibility.Ineligible);
    }
}