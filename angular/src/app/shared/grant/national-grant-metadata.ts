import {Observable} from "rxjs/Observable";
import {ResponseData} from "../response-data/response-data";
import {GrantEligibility} from "../grants-eligibility/grant-eligibility";

export abstract class NationalGrantMetadata {

    constructor(public grantId: string) {
    }

    abstract getEligibility(responseData: ResponseData): Observable<GrantEligibility>;
}