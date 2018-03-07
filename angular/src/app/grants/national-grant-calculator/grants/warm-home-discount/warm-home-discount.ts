import {Injectable} from '@angular/core';
import {NationalGrantCalculator} from '../../national-grant-calculator';
import {Benefits} from '../../../../questionnaire/questions/benefits-question/benefits';
import {GrantEligibility} from '../../../grant-eligibility-service/grant-eligibility';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WarmHomeDiscount extends NationalGrantCalculator {

    private static readonly QUALIFYING_BENEFIT = Benefits.PensionGuaranteeCredit;
    private static readonly ANNUAL_PAYMENT_POUNDS = 140;

    constructor() {
        super('warm-home-discount');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        let eligibility: GrantEligibility;
        if (responseData.benefits & WarmHomeDiscount.QUALIFYING_BENEFIT) {
            eligibility = GrantEligibility.LikelyEligible;
        } else {
            eligibility = GrantEligibility.Ineligible;
            // TODO: improve this (BEISDEAS-96)
        }
        return Observable.of(eligibility);
    }

    getStandaloneAnnualPaymentPounds(resposeData: ResponseData): number {
        return WarmHomeDiscount.ANNUAL_PAYMENT_POUNDS;
    }
}
