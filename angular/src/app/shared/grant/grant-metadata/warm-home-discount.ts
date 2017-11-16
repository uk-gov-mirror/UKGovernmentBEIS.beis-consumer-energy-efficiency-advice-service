import {NationalGrantMetadata} from "../national-grant-metadata";
import {Benefits} from "../../../questionnaire/questions/benefits-question/benefits";
import {GrantEligibility} from "../../grants-eligibility/grant-eligibility";
import {ResponseData} from "../../response-data/response-data";
import {Observable} from "rxjs/Observable";

export class WarmHomeDiscount extends NationalGrantMetadata {

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
            // TODO: depends on your energy supplier
        }
        return Observable.of(eligibility);
    }
}