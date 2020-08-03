import {async, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {IncomeThresholdByChildren, IncomeThresholds} from './income-threshold-service/income-thresholds';
import {EcoHhcroHelpToHeat} from './eco-hhcro-help-to-heat';
import {IncomeThresholdService} from './income-threshold-service/income-threshold.service';
import {GrantEligibility} from '../../../grant-eligibility-service/grant-eligibility';

describe('EcoHhcroHelpToHeat', () => {
    let responseData: ResponseData;
    let grantCalculator: EcoHhcroHelpToHeat;

    const incomeThresholds: IncomeThresholds = {
        'child-benefits': {
            singleClaim: new IncomeThresholdByChildren(
                0,
                18500,
                23000,
                27500,
                32000
            ),
            jointClaim: new IncomeThresholdByChildren(
                0,
                25500,
                30000,
                34500,
                39000
            ),
            getIncomeThresholdByChildren: () => this.singleClaim
        }
    };

    const incomeThresholdServiceStub = {
        fetchIncomeThresholds: () => Observable.of(incomeThresholds)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                EcoHhcroHelpToHeat,
                {provide: IncomeThresholdService, useValue: incomeThresholdServiceStub}
            ]
        });
    }));

    beforeEach(() => {
        responseData = new ResponseData();
        grantCalculator = TestBed.get(EcoHhcroHelpToHeat);
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

    it('should calculate as likely eligible if receiving income related benefits', () => {
        // given
        responseData.receiveIncomeRelatedBenefits = true;

        // when
        const calculatedEligibility = grantCalculator.getEligibility(responseData).toPromise();

        // then
        calculatedEligibility.then((eligibility) => {
            expect(eligibility).toBe(GrantEligibility.LikelyEligible);
        });
    });

    it('should calculate as likely eligible if receiving societal benefits', () => {
        // given
        responseData.receiveSocietalBenefits = true;

        // when
        const calculatedEligibility = grantCalculator.getEligibility(responseData).toPromise();

        // then
        calculatedEligibility.then((eligibility) => {
            expect(eligibility).toBe(GrantEligibility.LikelyEligible);
        });
    });

    it('should calculate as likely eligible if receiving defense related benefits', () => {
        // given
        responseData.receiveDefenseRelatedBenefits = true;

        // when
        const calculatedEligibility = grantCalculator.getEligibility(responseData).toPromise();

        // then
        calculatedEligibility.then((eligibility) => {
            expect(eligibility).toBe(GrantEligibility.LikelyEligible);
        });
    });

    it('should calculate as likely eligible if receiving child benefits and income below threshold', () => {
        // given
        responseData.receiveChildBenefits = true;
        responseData.numberOfAdultsAgedUnder64 = 1;
        responseData.numberOfAdultsAged64To80 = 0;
        responseData.numberOfAdultsAgedOver80 = 0;
        responseData.numberOfChildrenAged5AndAbove = 2;
        responseData.numberOfChildrenAgedUnder5 = 0;
        responseData.income = 21000;

        // when
        const calculatedEligibility = grantCalculator.getEligibility(responseData).toPromise();

        // then
        calculatedEligibility.then((eligibility) => {
            expect(eligibility).toBe(GrantEligibility.LikelyEligible);
        });
    });

    it('should calculate as ineligible if receiving child benefits and income above threshold', () => {
        // given
        responseData.receiveChildBenefits = true;
        responseData.numberOfAdultsAgedUnder64 = 1;
        responseData.numberOfAdultsAged64To80 = 0;
        responseData.numberOfAdultsAgedOver80 = 0;
        responseData.numberOfChildrenAged5AndAbove = 2;
        responseData.numberOfChildrenAgedUnder5 = 0;
        responseData.income = 31000;

        // when
        const calculatedEligibility = grantCalculator.getEligibility(responseData).toPromise();

        // then
        calculatedEligibility.then((eligibility) => {
            expect(eligibility).toBe(GrantEligibility.Ineligible);
        });
    });

    it('should calculate as ineligible if not receiving any benefits', () => {
        // given

        // when
        const calculatedEligibility = grantCalculator.getEligibility(responseData).toPromise();

        // then
        calculatedEligibility.then((eligibility) => {
            expect(eligibility).toBe(GrantEligibility.Ineligible);
        });
    });
});
