import {Observable} from "rxjs/Observable";
import {ResponseData} from "../../shared/response-data/response-data";
import {GrantEligibility} from "../grant-eligibility-service/grant-eligibility";

export abstract class NationalGrantCalculator {

    constructor(public grantId: string) {
    }

    abstract getEligibility(responseData: ResponseData): Observable<GrantEligibility>;

    getStandaloneAnnualPaymentPounds(responseData: ResponseData): Observable<number> {
        return Observable.of(null);
    };

    getAnnualPaymentPoundsByMeasure(responseData: ResponseData): Observable<{[measureCode: string]: number}> {
        return Observable.of({});
    };
}