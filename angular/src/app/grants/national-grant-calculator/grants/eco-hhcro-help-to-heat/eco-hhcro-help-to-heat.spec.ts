import {Observable} from "rxjs/Observable";
import {ResponseData} from "../../../../shared/response-data/response-data";
import {IncomeThresholds} from "./income-threshold-service/income-thresholds";
import {EcoHhcroHelpToHeat} from "./eco-hhcro-help-to-heat";
import {IncomeThresholdService} from "./income-threshold-service/income-threshold.service";
import {Benefits} from "../../../../questionnaire/questions/benefits-question/benefits";
import {GrantEligibility} from "../../../grant-eligibility-service/grant-eligibility";

describe('EcoHhcroHelpToHeat', () => {
    let responseData: ResponseData;

    const incomeThresholds: IncomeThresholds = {
        "tax-credits": {
            "singleClaim": {
                "zeroChildren": 13200,
                "oneChild": 17400,
                "twoChildren": 21600,
                "threeChildren": 25800,
                "fourPlusChildren": 30000
            },
            "jointClaim": {
                "zeroChildren": 19800,
                "oneChild": 24000,
                "twoChildren": 28200,
                "threeChildren": 32400,
                "fourPlusChildren": 36600
            }
        },
        "universal-credit": {
            "singleClaim": {
                "zeroChildren": 1100,
                "oneChild": 1450,
                "twoChildren": 1800,
                "threeChildren": 2150,
                "fourPlusChildren": 2500
            },
            "jointClaim": {
                "zeroChildren": 1650,
                "oneChild": 2000,
                "twoChildren": 2350,
                "threeChildren": 2700,
                "fourPlusChildren": 3050
            }
        }
    };
    class MockIncomeThresholdService extends IncomeThresholdService {
        constructor() {
            super(null, null);
        }

        fetchIncomeThresholds() {
            return Observable.of(incomeThresholds);
        }
    }

    const grantCalculator: EcoHhcroHelpToHeat = new EcoHhcroHelpToHeat(new MockIncomeThresholdService());

    beforeEach(() => {
        responseData = new ResponseData();
    });

    it('should calculate as ineligible if receiving no benefits', () => {
        // given
        responseData.benefits = Benefits.None;

        // when
        grantCalculator.getEligibility(responseData).toPromise()

        // then
            .then((eligibility) => {
                expect(eligibility).toBe(GrantEligibility.Ineligible);
            });
    });

    it('should calculate as eligible if receiving ESA', () => {
        // given
        responseData.benefits = Benefits.ESA;

        // when
        grantCalculator.getEligibility(responseData).toPromise()

            // then
            .then((eligibility) => {
                expect(eligibility).toBe(GrantEligibility.LikelyEligible);
            });
    });

    it('should calculate as eligible if receiving JSA', () => {
        // given
        responseData.benefits = Benefits.JobseekersAllowance;

        // when
        grantCalculator.getEligibility(responseData).toPromise()

        // then
            .then((eligibility) => {
                expect(eligibility).toBe(GrantEligibility.LikelyEligible);
            });
    });

    it('should calculate as eligible if receiving income support', () => {
        // given
        responseData.benefits = Benefits.IncomeSupport;

        // when
        grantCalculator.getEligibility(responseData).toPromise()

        // then
            .then((eligibility) => {
                expect(eligibility).toBe(GrantEligibility.LikelyEligible);
            });
    });

    it('should calculate as eligible if receiving pension guarantee credit', () => {
        // given
        responseData.benefits = Benefits.PensionGuaranteeCredit;

        // when
        grantCalculator.getEligibility(responseData).toPromise()

        // then
            .then((eligibility) => {
                expect(eligibility).toBe(GrantEligibility.LikelyEligible);
            });
    });

    it('should calculate as eligible if receiving tax credits and income below threshold', () => {
        // given
        responseData.benefits = Benefits.TaxCredits;
        responseData.numberOfAdultsAgedUnder64 = 1;
        responseData.numberOfAdultsAged64To80 = 0;
        responseData.numberOfAdultsAgedOver80 = 0;
        responseData.numberOfChildren = 2;
        responseData.income = 21000;

        // when
        grantCalculator.getEligibility(responseData).toPromise()

        // then
            .then((eligibility) => {
                expect(eligibility).toBe(GrantEligibility.LikelyEligible);
            });
    });

    it('should calculate as ineligible if receiving tax credits and income above threshold', () => {
        // given
        responseData.benefits = Benefits.TaxCredits;
        responseData.numberOfAdultsAgedUnder64 = 1;
        responseData.numberOfAdultsAged64To80 = 0;
        responseData.numberOfAdultsAgedOver80 = 0;
        responseData.numberOfChildren = 2;
        responseData.income = 22000;

        // when
        grantCalculator.getEligibility(responseData).toPromise()

        // then
            .then((eligibility) => {
                expect(eligibility).toBe(GrantEligibility.Ineligible);
            });
    });

    it('should calculate as eligible if receiving universal and income below threshold', () => {
        // given
        responseData.benefits = Benefits.UniversalCredit;
        responseData.numberOfAdultsAgedUnder64 = 1;
        responseData.numberOfAdultsAged64To80 = 1;
        responseData.numberOfAdultsAgedOver80 = 0;
        responseData.numberOfChildren = 3;
        responseData.income = 32000;

        // when
        grantCalculator.getEligibility(responseData).toPromise()

        // then
            .then((eligibility) => {
                expect(eligibility).toBe(GrantEligibility.LikelyEligible);
            });
    });

    it('should calculate as ineligible if receiving universal and income above threshold', () => {
        // given
        responseData.benefits = Benefits.UniversalCredit;
        responseData.numberOfAdultsAgedUnder64 = 1;
        responseData.numberOfAdultsAged64To80 = 1;
        responseData.numberOfAdultsAgedOver80 = 0;
        responseData.numberOfChildren = 3;
        responseData.income = 33000;

        // when
        grantCalculator.getEligibility(responseData).toPromise()

        // then
            .then((eligibility) => {
                expect(eligibility).toBe(GrantEligibility.Ineligible);
            });
    });
});