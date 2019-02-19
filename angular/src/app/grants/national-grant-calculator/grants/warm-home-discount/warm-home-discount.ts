import {Injectable} from '@angular/core';
import {NationalGrantCalculator} from '../../national-grant-calculator';
import {GrantEligibility} from '../../../grant-eligibility-service/grant-eligibility';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WarmHomeDiscount extends NationalGrantCalculator {

    private static readonly ANNUAL_PAYMENT_POUNDS = 140;

    constructor() {
        super('warm-home-discount');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        let eligibility: GrantEligibility;
        if (responseData.receivePensionGuaranteeCredit) {
            // This is a bit rough-and-ready.
            // It might be possible to improve rather than just saying 'may be eligible'.
            //
            // Eligibility depends on income and your energy supplier
            eligibility = GrantEligibility.LikelyEligible;
        } else {
            eligibility = GrantEligibility.Ineligible;
        }
        return Observable.of(eligibility);
    }

    getStandaloneAnnualPaymentPounds(resposeData: ResponseData): number {
        return WarmHomeDiscount.ANNUAL_PAYMENT_POUNDS;
    }
}
