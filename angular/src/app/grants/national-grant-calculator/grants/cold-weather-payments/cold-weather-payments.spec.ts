import {async, TestBed} from '@angular/core/testing';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {GrantEligibility} from '../../../grant-eligibility-service/grant-eligibility';
import {ColdWeatherPayments} from "./cold-weather-payments";

describe('ColdWeatherPayments', () => {
    let responseData: ResponseData;
    let grantCalculator: ColdWeatherPayments;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                ColdWeatherPayments
            ]
        });
    }));

    beforeEach(() => {
        responseData = new ResponseData();
        grantCalculator = TestBed.get(ColdWeatherPayments);
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

    it('should calculate as maybe eligible if receiving income related benefits', () => {
        // given
        responseData.receiveIncomeRelatedBenefits = true;

        // when
        const calculatedEligibility = grantCalculator.getEligibility(responseData).toPromise();

        // then
        calculatedEligibility.then((eligibility) => {
            expect(eligibility).toBe(GrantEligibility.MayBeEligible);
        });
    });

    it('should calculate as ineligible if not receiving pension guarantee credit or income related benefits', () => {
        // given
        responseData.receivePensionGuaranteeCredit = false;
        responseData.receiveIncomeRelatedBenefits = false;

        // when
        const calculatedEligibility = grantCalculator.getEligibility(responseData).toPromise();

        // then
        calculatedEligibility.then((eligibility) => {
            expect(eligibility).toBe(GrantEligibility.Ineligible);
        });
    });
});
