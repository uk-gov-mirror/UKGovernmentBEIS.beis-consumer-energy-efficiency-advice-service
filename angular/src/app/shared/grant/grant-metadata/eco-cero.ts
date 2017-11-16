import {NationalGrantMetadata} from "../national-grant-metadata";
import {GrantEligibility} from "../../grants-eligibility/grant-eligibility";
import {ResponseData} from "../../response-data/response-data";
import {Observable} from "rxjs/Observable";

export class EcoCero extends NationalGrantMetadata {
    constructor() {
        super('eco-cero');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        // TODO: add ECO CERO API lookup (BEISDEAS-75)
        return Observable.of(GrantEligibility.MayBeEligible);
    }
}