import {RoundingService} from "../rounding-service/rounding.service";

export class InstallationCost {
    min: number;
    max: number;
    isBreRange: boolean;

    constructor(min: number, max: number, isBreRange: boolean) {
        this.min = min;
        this.max = max;
        this.isBreRange = isBreRange;
    }

    // Estimate investment cost as the midpoint of the range
    public getEstimatedInvestment(): number {
        return (this.min + this.max) / 2;
    }

    public getInvestmentRequiredString(): string {
        if (!this.isBreRange) {
            return `£${this.min} - £${this.max}`;
        } else if (this.getEstimatedInvestment() >= 0) {
            return '£' + RoundingService.roundCostValue(this.getEstimatedInvestment());
        } else {
            return '-';
        }
    }
}