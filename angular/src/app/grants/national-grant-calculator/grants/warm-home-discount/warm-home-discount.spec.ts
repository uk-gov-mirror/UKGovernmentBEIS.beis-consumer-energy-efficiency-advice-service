import {async, TestBed} from '@angular/core/testing';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {GrantEligibility} from '../../../grant-eligibility-service/grant-eligibility';
import {WarmHomeDiscount} from "./warm-home-discount";

describe('WarmHomeDiscount', () => {
    let responseData: ResponseData;
    let grantCalculator: WarmHomeDiscount;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                WarmHomeDiscount
            ]
        });
    }));

    beforeEach(() => {
        responseData = new ResponseData();
        grantCalculator = TestBed.get(WarmHomeDiscount);
    });

    it('should calculate as likely eligible if receiving pension guarantee credit', () => {
        // given
        responseData.receivePensionGuaranteeCredit = true;

        // when
        const calculatedEligibility = grantCalculator.getEligibility(responseData).toPromise();

        // then
        calculatedEligibility.then((eligibility) => {
            expect(eligibility).toBe(GrantEligibility.LikelyEligible);
        });
    });

    it('should calculate as ineligible if not receiving pension guarantee credit', () => {
        // given
        responseData.receivePensionGuaranteeCredit = false;

        // when
        const calculatedEligibility = grantCalculator.getEligibility(responseData).toPromise();

        // then
        calculatedEligibility.then((eligibility) => {
            expect(eligibility).toBe(GrantEligibility.Ineligible);
        });
    });
});
