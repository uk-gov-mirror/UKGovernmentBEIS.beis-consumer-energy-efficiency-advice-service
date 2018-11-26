/**
 * Keep this in sync with EnergySavingPlanController.java
 */
import {EnergyEfficiencyRecommendation} from "./energy-efficiency-recommendation";
import {SavingsRange} from "./savings-range";
import {RoundingService} from "../rounding-service/rounding.service";
import sumBy from 'lodash-es/sumBy';
import mean from 'lodash-es/mean';

export abstract class EnergyEfficiencyRecommendationService {

    static getSavingDisplay(recommendation: EnergyEfficiencyRecommendation, showMonthlySavings: boolean): string {
        const minimumSaving = this.getSaving(recommendation.minimumCostSavingPoundsPerYear, showMonthlySavings);
        const maximumSaving = this.getSaving(recommendation.maximumCostSavingPoundsPerYear, showMonthlySavings);
        return this.roundAndFormatValueRange(minimumSaving, maximumSaving);
    }

    static getTotalSavingsDisplay(recommendations: EnergyEfficiencyRecommendation[], showMonthlySavings: boolean): string {
        const savingsRange = this.getSavingsRange(recommendations, showMonthlySavings);
        return this.roundAndFormatValueRange(savingsRange.minimumSavings, savingsRange.maximumSavings);
    }

    static getApproxSavingsDisplay(recommendations: EnergyEfficiencyRecommendation[], showMonthlySavings: boolean): string {
        const savingsRange = this.getSavingsRange(recommendations, showMonthlySavings);
        const approxSavings = RoundingService.roundCostValue(mean([savingsRange.minimumSavings, savingsRange.maximumSavings]));
        return this.formatCostValueAndNotDisplayZeroValue(approxSavings);
    }

    private static roundAndFormatValueRange(minimumInput: number, maximumInput: number): string {
        const roundedMinimumInput = RoundingService.roundCostValue(minimumInput);
        const roundedMaximumInput = RoundingService.roundCostValue(maximumInput);

        if (roundedMinimumInput === roundedMaximumInput) {
            return this.formatCostValueAndNotDisplayZeroValue(roundedMaximumInput);
        }
        return '£' + roundedMinimumInput + ' – £' + roundedMaximumInput;
    }

    private static formatCostValueAndNotDisplayZeroValue(input: number): string {
        return input > 0
            ? this.formatCostValue(input)
            : '-';
    }

    private static formatCostValue(input: number): string {
        return '£' + input;
    }

    private static getSaving(savingPerYear: number, showMonthlySavings: boolean): number {
        return showMonthlySavings
            ? this.getSavingPerMonth(savingPerYear)
            : savingPerYear;
    }

    private static getSavingPerMonth(savingPerYear: number): number {
        return savingPerYear / 12;
    }

    private static getSavingsRange(recommendations: EnergyEfficiencyRecommendation[], showMonthlySavings: boolean): SavingsRange {
        const minimumSavings = sumBy(
            recommendations,
            recommendation => this.getSaving(recommendation.minimumCostSavingPoundsPerYear, showMonthlySavings)
        );
        const maximumSavings = sumBy(
            recommendations,
            recommendation => this.getSaving(recommendation.maximumCostSavingPoundsPerYear, showMonthlySavings)
        );
        return new SavingsRange(minimumSavings, maximumSavings);
    }
}
