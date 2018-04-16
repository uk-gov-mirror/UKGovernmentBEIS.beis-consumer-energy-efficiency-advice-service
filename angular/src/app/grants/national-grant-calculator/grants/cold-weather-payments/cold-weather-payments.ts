import {Injectable} from '@angular/core';
import {NationalGrantCalculator} from '../../national-grant-calculator';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {GrantEligibility} from '../../../grant-eligibility-service/grant-eligibility';
import {Benefits} from '../../../../questionnaire/questions/benefits-question/benefits';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ColdWeatherPayments extends NationalGrantCalculator {

    private static readonly AUTOMATICALLY_QUALIFYING_BENEFITS: Benefits = Benefits.PensionGuaranteeCredit;
    private static readonly CONDITIONALLY_QUALIFYING_BENEFITS: Benefits = Benefits.IncomeSupport | Benefits.JobseekersAllowance |
            Benefits.ESA | Benefits.UniversalCredit;

    constructor() {
        super('cold-weather-payments');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        // This is a bit rough-and-ready. It might be possible to
        // improve rather than just saying 'may be eligible'.
        // See // https://www.gov.uk/cold-weather-payment/eligibility
        // for eligibility criteria.
        //
        // However, if you're eligible then you should get
        // this automatically - so it is not a priority.
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
}
