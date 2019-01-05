import {Injectable} from '@angular/core';
import {NationalGrantCalculator} from '../../national-grant-calculator';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {GrantEligibility} from '../../../grant-eligibility-service/grant-eligibility';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ColdWeatherPayments extends NationalGrantCalculator {

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
        if (responseData.receivePensionGuaranteeCredit) {
            eligibility = GrantEligibility.LikelyEligible;
        } else if (responseData.receiveIncomeRelatedBenefits) {
            eligibility = GrantEligibility.MayBeEligible;
        } else {
            eligibility = GrantEligibility.Ineligible;
        }
        return Observable.of(eligibility);
    }
}
