import {NationalGrantMetadata} from "../national-grant-metadata";
import {GrantEligibility} from "../../grants-eligibility/grant-eligibility";
import {ResponseData} from "../../response-data/response-data";
import {Observable} from "rxjs/Observable";

export class WinterFuelPayments extends NationalGrantMetadata {
    constructor() {
        super('winter-fuel-payments');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        let eligibility: GrantEligibility;
        // TODO: needs adult ages once everything's rebased on master
        eligibility = GrantEligibility.MayBeEligible;
        return Observable.of(eligibility);
    }
}