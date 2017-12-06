import {Component} from "@angular/core";
import sumBy from "lodash-es/sumBy";
import {EnergyEfficiencyRecommendation} from "../../shared/recommendations-service/energy-efficiency-recommendation";
import {RecommendationsService} from "../../shared/recommendations-service/recommendations.service";
import {RoundingService} from "../../shared/rounding-service/rounding.service";

@Component({
    selector: 'app-your-plan-summary',
    templateUrl: './your-plan-summary.component.html',
    styleUrls: ['./your-plan-summary.component.scss']
})
export class YourPlanSummaryComponent {

    get recommendations(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getRecommendationsInPlan();
    }

    constructor(private recommendationsService: RecommendationsService) {
    }

    getRoundedTotalSavingsPerMonth(): number {
        const savingsPerMonth = sumBy(
            this.recommendations,
            recommendation => recommendation.costSavingPoundsPerMonth
        );
        return RoundingService.roundCostValue(savingsPerMonth);
    }

    getRoundedTotalInvestmentRequired(): number {
        const totalInvestment = sumBy(
            this.recommendations,
            recommendation => recommendation.investmentPounds
        );
        return RoundingService.roundCostValue(totalInvestment);
    }

    get potentialScore(): number {
        return this.recommendationsService.potentialScore;
    }

    get currentScoreColorCircleClassName(): string {
        return this.potentialScore > this.recommendationsService.cachedCurrentScore ? 'green' : 'amber';
    }
}