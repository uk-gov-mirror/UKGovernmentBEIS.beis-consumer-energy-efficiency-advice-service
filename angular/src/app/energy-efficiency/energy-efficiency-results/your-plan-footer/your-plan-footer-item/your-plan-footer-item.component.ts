import {Component, Input} from '@angular/core';
import {EnergyEfficiencyRecommendation} from "../../../../shared/recommendations-service/energy-efficiency-recommendation";

@Component({
    selector: 'app-your-plan-footer-item',
    templateUrl: './your-plan-footer-item.component.html',
    styleUrls: ['./your-plan-footer-item.component.scss']
})
export class YourPlanFooterItemComponent {

    @Input() recommendation: EnergyEfficiencyRecommendation;

    removeFromPlan(): void {
        this.recommendation.isAddedToPlan = false;
    }
}
