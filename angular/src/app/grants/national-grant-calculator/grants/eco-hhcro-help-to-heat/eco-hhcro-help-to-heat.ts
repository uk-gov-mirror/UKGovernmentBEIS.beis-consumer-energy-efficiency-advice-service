import {NationalGrantCalculator} from "../../national-grant-calculator";
import {ResponseData} from "../../../../shared/response-data/response-data";
import {GrantEligibility} from "../../../grant-eligibility-service/grant-eligibility";
import {Benefits} from "../../../../questionnaire/questions/benefits-question/benefits";
import {Observable} from "rxjs/Observable";
import {IncomeThresholdService} from "./income-threshold-service/income-threshold.service";
import {IncomeThresholdByChildren, IncomeThreshold} from "./income-threshold-service/income-thresholds";

export class EcoHhcroHelpToHeat extends NationalGrantCalculator {

    private static readonly AUTOMATICALLY_QUALIFYING_BENEFITS: Benefits = Benefits.ESA | Benefits.JobseekersAllowance |
        Benefits.IncomeSupport | Benefits.PensionGuaranteeCredit;

    constructor(private incomeThresholdService: IncomeThresholdService) {
        super('eco-hhcro-help-to-heat');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        if (responseData.benefits & EcoHhcroHelpToHeat.AUTOMATICALLY_QUALIFYING_BENEFITS) {
            return Observable.of(GrantEligibility.LikelyEligible);
        } else if (responseData.benefits & Benefits.TaxCredits) {
            return this.getTaxCreditsEligibility(responseData);
        } else if (responseData.benefits & Benefits.UniversalCredit) {
            return this.getUniversalCreditEligibility(responseData);
        } else {
            return Observable.of(GrantEligibility.Ineligible);
        }
    }

    getAnnualPaymentPounds(resposeData: ResponseData): Observable<number> {
        return Observable.of(null);
    }

    private getTaxCreditsEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        const relevantIncomeThreshold = this.incomeThresholdService.fetchIncomeThresholds()
            .map(incomeThresholds => incomeThresholds['tax-credits']);
        // Tax credits thresholds are compared to annual income
        const relevantIncome = responseData.income;
        return EcoHhcroHelpToHeat.getEligibilityFromIncome(
            relevantIncomeThreshold,
            relevantIncome,
            responseData.getNumberOfAdults(),
            responseData.numberOfChildren
        );
    }

    private getUniversalCreditEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        const relevantIncomeThreshold = this.incomeThresholdService.fetchIncomeThresholds()
            .map(incomeThresholds => incomeThresholds['universal-credit']);
        // Universal credit thresholds are compared to monthly income
        const relevantIncome = responseData.income / 12;
        return EcoHhcroHelpToHeat.getEligibilityFromIncome(
            relevantIncomeThreshold,
            relevantIncome,
            responseData.getNumberOfAdults(),
            responseData.numberOfChildren
        );
    }

    private static getEligibilityFromIncome(relevantIncomeThreshold: Observable<IncomeThreshold>,
                                     relevantIncome: number,
                                     numberOfAdults: number,
                                     numberOfChildren: number): Observable<GrantEligibility> {
        const incomeThresholdValue = relevantIncomeThreshold
            .map(incomeThreshold => {
                const incomeThresholdByChildren = numberOfAdults === 1 ?
                    incomeThreshold.singleClaim : incomeThreshold.jointClaim;
                return EcoHhcroHelpToHeat.getIncomeThresholdValue(incomeThresholdByChildren, numberOfChildren);
            });
        return incomeThresholdValue
            .map(thresholdValue => relevantIncome < thresholdValue ? GrantEligibility.LikelyEligible : GrantEligibility.Ineligible);

    }

    private static getIncomeThresholdValue(incomeThresholdByChildren: IncomeThresholdByChildren,
                                           numberOfChildren: number): number {
        switch (numberOfChildren) {
            case 0: {
                return incomeThresholdByChildren.zeroChildren;
            }
            case 1: {
                return incomeThresholdByChildren.oneChild;
            }
            case 2: {
                return incomeThresholdByChildren.twoChildren;
            }
            case 3: {
                return incomeThresholdByChildren.threeChildren;
            }
            default: {
                return incomeThresholdByChildren.fourPlusChildren;
            }
        }
    }
}