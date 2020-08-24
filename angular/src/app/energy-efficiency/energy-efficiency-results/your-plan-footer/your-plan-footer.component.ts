import {Component, EventEmitter, Output} from '@angular/core';
import {EnergyEfficiencyRecommendation} from '../../../shared/recommendations-service/energy-efficiency-recommendation';
import {RecommendationsService} from '../../../shared/recommendations-service/recommendations.service';
import {AbTestingService} from '../../../shared/analytics/ab-testing.service';
import {EnergyEfficiencyDisplayService} from "../../../shared/energy-efficiency-display-service/energy-efficiency-display.service";

@Component({
    selector: 'app-your-plan-footer',
    templateUrl: './your-plan-footer.component.html',
    styleUrls: ['./your-plan-footer.component.scss']
})
export class YourPlanFooterComponent {
    @Output() onDoPlan: EventEmitter<null> = new EventEmitter<null>();

    get userRecommendations(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getUserRecommendationsInPlan();
    }

    get landlordRecommendations(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getLandlordRecommendationsInPlan();
    }

    get numberOfRecommendations(): number {
        return this.energyEfficiencyDisplayService.getApparentNumberOfRecommendations();
    }

    get totalSavingsPerYear(): number {
        return this.recommendationsService.getRecommendationsInPlan()
            .reduce((totalSavings, recommendation) => totalSavings + recommendation.costSavingPoundsPerYear, 0);
    }

    get combinedLandlordRecommendationHeadline(): string {
        return this.energyEfficiencyDisplayService.getCombinedLandlordRecommendationHeadline();
    }

    constructor(private recommendationsService: RecommendationsService,
                private abTestingService: AbTestingService,
                private energyEfficiencyDisplayService: EnergyEfficiencyDisplayService) {
    }

    getYouHaveAddedRecommendations() {
        return this.energyEfficiencyDisplayService.getYouHaveAddedRecommendationsInfo();
    }

    DoPlanClicked() {
        this.onDoPlan.emit();
    }
}
