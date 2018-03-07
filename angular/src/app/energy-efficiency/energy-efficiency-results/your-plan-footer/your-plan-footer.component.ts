import {Component} from '@angular/core';
import {EnergyEfficiencyRecommendation} from '../../../shared/recommendations-service/energy-efficiency-recommendation';
import {RecommendationsService} from '../../../shared/recommendations-service/recommendations.service';

@Component({
    selector: 'app-your-plan-footer',
    templateUrl: './your-plan-footer.component.html',
    styleUrls: ['./your-plan-footer.component.scss']
})
export class YourPlanFooterComponent {
    get recommendations(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getRecommendationsInPlan();
    }

    constructor(private recommendationsService: RecommendationsService) {
    }

    removeFromPlan(recommendation: EnergyEfficiencyRecommendation): void {
        recommendation.isAddedToPlan = false;
    }
}
