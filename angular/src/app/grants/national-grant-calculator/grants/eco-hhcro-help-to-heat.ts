import {NationalGrantCalculator} from "../national-grant-calculator";
import {ResponseData} from "../../../shared/response-data/response-data";
import {GrantEligibility} from "../../grant-eligibility-service/grant-eligibility";
import {Benefits} from "../../../questionnaire/questions/benefits-question/benefits";
import {Observable} from "rxjs/Observable";

export class EcoHhcroHelpToHeat extends NationalGrantCalculator {

    private static readonly AUTOMATICALLY_QUALIFYING_BENEFITS: Benefits = Benefits.ESA | Benefits.JobseekersAllowance |
        Benefits.IncomeSupport | Benefits.PensionGuaranteeCredit;

    constructor() {
        super('eco-hhcro-help-to-heat');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        // TODO: Improve this calculation (BEISDEAS-95)
        let eligibility: GrantEligibility;
        if (responseData.benefits & EcoHhcroHelpToHeat.AUTOMATICALLY_QUALIFYING_BENEFITS) {
            eligibility = GrantEligibility.LikelyEligible;
        } else if (responseData.benefits & Benefits.TaxCredits) {
            eligibility = GrantEligibility.MayBeEligible;
        } else if (responseData.benefits & Benefits.UniversalCredit) {
            eligibility = GrantEligibility.MayBeEligible;
        }
        return Observable.of(eligibility);
    }
}