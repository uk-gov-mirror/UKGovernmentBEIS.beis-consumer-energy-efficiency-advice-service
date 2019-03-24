import {Component, Input} from '@angular/core';
import {EnergyEfficiencyRecommendation} from "../../../../shared/recommendations-service/energy-efficiency-recommendation";

@Component({
    selector: 'app-your-plan-footer-combined-item',
    templateUrl: './your-plan-footer-combined-item.component.html',
    styleUrls: ['../your-plan-footer-item/your-plan-footer-item.component.scss']
})
export class YourPlanFooterCombinedItemComponent {

    @Input() recommendations: EnergyEfficiencyRecommendation[];
    @Input() combinedHeadline: string;

    removeFromPlan(): void {
        this.recommendations.forEach(recommendation => {
            recommendation.isAddedToPlan = false;
        });
    }
}
