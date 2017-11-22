import {NationalGrantCalculator} from "../../national-grant-calculator";
import {ResponseData} from "../../../../shared/response-data/response-data";
import {GrantEligibility} from "../../../grant-eligibility-service/grant-eligibility";
import {Benefits} from "../../../../questionnaire/questions/benefits-question/benefits";
import {Observable} from "rxjs/Observable";

export class ColdWeatherPayments extends NationalGrantCalculator {

    private static readonly AUTOMATICALLY_QUALIFYING_BENEFITS: Benefits = Benefits.PensionGuaranteeCredit;
    private static readonly CONDITIONALLY_QUALIFYING_BENEFITS: Benefits = Benefits.IncomeSupport | Benefits.JobseekersAllowance |
            Benefits.ESA | Benefits.UniversalCredit;

    constructor() {
        super('cold-weather-payments');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        // TODO: Improve this calculation (BEISDEAS-94)
        let eligibility: GrantEligibility;
        if (responseData.benefits & ColdWeatherPayments.AUTOMATICALLY_QUALIFYING_BENEFITS) {
            eligibility = GrantEligibility.LikelyEligible;
        } else if (responseData.benefits & ColdWeatherPayments.CONDITIONALLY_QUALIFYING_BENEFITS) {
            eligibility = GrantEligibility.MayBeEligible;
        } else {
            eligibility = GrantEligibility.Ineligible;
        }
        return Observable.of(eligibility);
    }

    getAnnualPaymentPounds(resposeData: ResponseData): Observable<number> {
        return Observable.of(null);
    }
}