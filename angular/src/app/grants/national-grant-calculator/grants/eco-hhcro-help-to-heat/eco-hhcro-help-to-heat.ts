import {Injectable} from '@angular/core';
import {NationalGrantCalculator} from '../../national-grant-calculator';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {GrantEligibility} from '../../../grant-eligibility-service/grant-eligibility';
import {Observable} from 'rxjs/Observable';
import {IncomeThresholdService} from './income-threshold-service/income-threshold.service';
import {IncomeThreshold} from './income-threshold-service/income-thresholds';

@Injectable()
export class EcoHhcroHelpToHeat extends NationalGrantCalculator {

    public static readonly GRANT_ID: string = 'eco-hhcro-help-to-heat';

    constructor(private incomeThresholdService: IncomeThresholdService) {
        super(EcoHhcroHelpToHeat.GRANT_ID);
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        if (EcoHhcroHelpToHeat.receiveAnyBenefitOtherThanChildBenefits(responseData)) {
            return Observable.of(GrantEligibility.LikelyEligible);
        }

        return this.getEligibilityBasedOnChildBenefitsAndIncome(responseData);
    }

    private getEligibilityBasedOnChildBenefitsAndIncome(responseData: ResponseData): Observable<GrantEligibility> {
        if (!responseData.receiveChildBenefits) {
            return Observable.of(GrantEligibility.Ineligible);
        }
        return this.getChildBenefitsEligibility(responseData);
    }

    private getChildBenefitsEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        // Child benefits thresholds are compared to annual income
        const relevantIncome = responseData.income;
        if (!relevantIncome || !responseData.numberOfAdults || !responseData.numberOfChildren) {
            return Observable.of(GrantEligibility.NotCalculated);
        }
        const relevantIncomeThreshold = this.incomeThresholdService.fetchIncomeThresholds()
            .map(incomeThresholds => incomeThresholds['child-benefits']);
        return EcoHhcroHelpToHeat.getEligibilityFromIncome(
            relevantIncomeThreshold,
            relevantIncome,
            responseData.numberOfAdults,
            responseData.numberOfChildren
        );
    }

    private static receiveAnyBenefitOtherThanChildBenefits(responseData: ResponseData): boolean {
        return responseData.receivePensionGuaranteeCredit
            || responseData.receiveIncomeRelatedBenefits
            || responseData.receiveSocietalBenefits
            || responseData.receiveDefenseRelatedBenefits;
    }

    private static getEligibilityFromIncome(relevantIncomeThreshold: Observable<IncomeThreshold>,
                                            relevantIncome: number,
                                            numberOfAdults: number,
                                            numberOfChildren: number): Observable<GrantEligibility> {
        const incomeThresholdValue = relevantIncomeThreshold
            .map(incomeThreshold => {
                const incomeThresholdByChildren = numberOfAdults === 1 ?
                    incomeThreshold.singleClaim : incomeThreshold.jointClaim;
                return incomeThresholdByChildren.getIncomeThresholdValue(numberOfChildren);
            });
        return incomeThresholdValue
            .map(thresholdValue => relevantIncome < thresholdValue ? GrantEligibility.LikelyEligible : GrantEligibility.Ineligible);

    }
}
