import {RoundingService} from "../rounding-service/rounding.service";

export class InstallationCost {
    constructor(
        public min: number,
        public max: number,
        public isBreRange: boolean
    ) {}

    // Estimate investment cost as the midpoint of the range
    public getEstimatedInvestment(): number {
        return (this.min + this.max) / 2;
    }

    public getInvestmentRequiredString(): string {
        if (!this.isBreRange) {
            return `£${RoundingService.roundCostValue(this.min)} - £${RoundingService.roundCostValue(this.max)}`;
        } else if (this.getEstimatedInvestment() >= 0) {
            return '£' + RoundingService.roundCostValue(this.getEstimatedInvestment());
        } else {
            return '£0';
        }
    }
}
