import {NationalGrantCalculator} from "../national-grant-calculator";
import {Benefits} from "../../../questionnaire/questions/benefits-question/benefits";
import {GrantEligibility} from "../../grant-eligibility-service/grant-eligibility";
import {ResponseData} from "../../../shared/response-data/response-data";
import {Observable} from "rxjs/Observable";

export class WarmHomeDiscount extends NationalGrantCalculator {

    private static readonly QUALIFYING_BENEFIT = Benefits.PensionGuaranteeCredit;

    constructor() {
        super('warm-home-discount');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        let eligibility: GrantEligibility;
        if (responseData.benefits & WarmHomeDiscount.QUALIFYING_BENEFIT) {
            eligibility = GrantEligibility.LikelyEligible;
        } else {
            eligibility = GrantEligibility.MayBeEligible;
            // TODO: improve this (BEISDEAS-96)
        }
        return Observable.of(eligibility);
    }
}