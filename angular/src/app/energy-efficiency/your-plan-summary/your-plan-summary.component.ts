import {Component, Input} from '@angular/core';
import sumBy from 'lodash-es/sumBy';
import {EnergyEfficiencyRecommendation} from '../../shared/recommendations-service/energy-efficiency-recommendation';
import {RecommendationsService} from '../../shared/recommendations-service/recommendations.service';
import {RoundingService} from '../../shared/rounding-service/rounding.service';
import {ResponseData} from '../../shared/response-data/response-data';
import {TenureType} from '../../questionnaire/questions/tenure-type-question/tenure-type';
import {EnergyEfficiencyRecommendationService} from "../../shared/recommendations-service/energy-efficiency-recommendation.service";

@Component({
    selector: 'app-your-plan-summary',
    templateUrl: './your-plan-summary.component.html',
    styleUrls: ['./your-plan-summary.component.scss']
})
export class YourPlanSummaryComponent {

    @Input() isFooter: boolean = false;

    constructor(private recommendationsService: RecommendationsService,
                private responseData: ResponseData) {
    }

    get recommendations(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getRecommendationsInPlan();
    }

    get totalSavingsDisplay(): string {
        return EnergyEfficiencyRecommendationService.getTotalSavingsDisplay(this.recommendations, this.showMonthlySavings);
    }

    getRoundedTotalInvestmentRequired(): number {
        const totalInvestment = sumBy(
            this.recommendations,
            recommendation => recommendation.investmentPounds
        );
        return RoundingService.roundCostValue(totalInvestment);
    }

    // Update the PDF renderer if you change this
    get showMonthlySavings() {
        return this.responseData.tenureType !== TenureType.OwnerOccupancy;
    }

    get potentialScore(): number {
        return this.recommendationsService.potentialScore;
    }

    get potentialScoreLoading(): boolean {
        return this.recommendationsService.potentialScoreLoading;
    }

    get currentScoreColorCircleClassName(): string {
        return this.potentialScore > this.recommendationsService.cachedCurrentScore ? 'green' : 'amber';
    }
}
