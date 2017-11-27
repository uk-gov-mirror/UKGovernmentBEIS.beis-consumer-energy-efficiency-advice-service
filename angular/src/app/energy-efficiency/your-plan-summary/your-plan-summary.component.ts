import {Component} from "@angular/core";
import {ResponseData} from "../../shared/response-data/response-data";
import {sumBy} from "lodash-es";
import {EnergyEfficiencyRecommendation} from "../recommendations/energy-efficiency-recommendation";
import {roundToNearest} from "../../shared/rounding/rounding";

@Component({
    selector: 'app-your-plan-summary',
    templateUrl: './your-plan-summary.component.html',
    styleUrls: ['./your-plan-summary.component.scss']
})
export class YourPlanSummaryComponent {

    private static readonly POUNDS_ROUNDING = 5;

    get recommendations(): EnergyEfficiencyRecommendation[] {
        return this.responseData.energyEfficiencyRecommendationsInPlan;
    }

    constructor(private responseData: ResponseData,) {
    }

    getRoundedTotalSavingsPerMonth(): number {
        const savingsPerMonth = sumBy(
            this.recommendations,
            recommendation => recommendation.costSavingPoundsPerMonth
        );
        return YourPlanSummaryComponent.round(savingsPerMonth);
    }

    getRoundedTotalInvestmentRequired(): number {
        const totalInvestment = sumBy(
            this.recommendations,
            recommendation => recommendation.investmentPounds
        );
        return YourPlanSummaryComponent.round(totalInvestment);
    }

    private static round(input: number): number {
        const roundingValue =
            input > YourPlanSummaryComponent.POUNDS_ROUNDING ?
                YourPlanSummaryComponent.POUNDS_ROUNDING : 1;
        return roundToNearest(input, roundingValue);
    }
}