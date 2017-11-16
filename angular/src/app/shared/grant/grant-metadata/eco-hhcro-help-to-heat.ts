import {NationalGrantMetadata} from "../national-grant-metadata";
import {ResponseData} from "../../response-data/response-data";
import {GrantEligibility} from "../../grants-eligibility/grant-eligibility";
import {Benefits} from "../../../questionnaire/questions/benefits-question/benefits";
import {Observable} from "rxjs/Observable";

export class EcoHhcroHelpToHeat extends NationalGrantMetadata {

    private static readonly AUTOMATICALLY_QUALIFYING_BENEFITS: Benefits = Benefits.ESA | Benefits.JobseekersAllowance |
        Benefits.IncomeSupport | Benefits.PensionGuaranteeCredit;

    constructor() {
        super('eco-hhcro-help-to-heat');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        let eligibility: GrantEligibility;
        if (responseData.benefits & EcoHhcroHelpToHeat.AUTOMATICALLY_QUALIFYING_BENEFITS) {
            eligibility = GrantEligibility.LikelyEligible;
        } else if (responseData.benefits & Benefits.TaxCredits) {
            // TODO: get income thresholds (when BEISDEAS-84 is done)
            eligibility = GrantEligibility.MayBeEligible;
        } else if (responseData.benefits & Benefits.UniversalCredit) {
            // TODO: get income thresholds!
            eligibility = GrantEligibility.MayBeEligible;
        }
        return Observable.of(eligibility);
    }
}