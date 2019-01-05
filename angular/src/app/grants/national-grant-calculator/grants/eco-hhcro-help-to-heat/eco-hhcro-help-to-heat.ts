import {Injectable} from '@angular/core';
import {NationalGrantCalculator} from '../../national-grant-calculator';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {GrantEligibility} from '../../../grant-eligibility-service/grant-eligibility';
import {Observable} from 'rxjs/Observable';
import {IncomeThresholdService} from './income-threshold-service/income-threshold.service';
import {IncomeThreshold, IncomeThresholdByChildren} from './income-threshold-service/income-thresholds';

@Injectable()
export class EcoHhcroHelpToHeat extends NationalGrantCalculator {

    constructor(private incomeThresholdService: IncomeThresholdService) {
        super('eco-hhcro-help-to-heat');
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
