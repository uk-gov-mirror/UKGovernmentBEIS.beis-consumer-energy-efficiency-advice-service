import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {EnergyEfficiencyRecommendation} from '../../../shared/recommendations-service/energy-efficiency-recommendation';
import {RecommendationsService} from '../../../shared/recommendations-service/recommendations.service';
import {AbTestingService} from '../../../shared/analytics/ab-testing.service';

@Component({
    selector: 'app-your-plan-footer',
    templateUrl: './your-plan-footer.component.html',
    styleUrls: ['./your-plan-footer.component.scss']
})
export class YourPlanFooterComponent implements OnInit {
    showOldVersion: boolean;

    @Output() onDoPlan: EventEmitter<null> = new EventEmitter<null>();

    get recommendations(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getRecommendationsInPlan();
    }

    constructor(private recommendationsService: RecommendationsService,
                private abTestingService: AbTestingService) {
    }

    ngOnInit() {
        this.showOldVersion = this.abTestingService.isInGroupA();
    }

    removeFromPlan(recommendation: EnergyEfficiencyRecommendation): void {
        recommendation.isAddedToPlan = false;
    }

    getYouHaveAddedRecommendations() {
        if (this.recommendations.length === 1) {
            return 'You have added 1 recommendation';
        } else {
            return `You have added ${this.recommendations.length} recommendations`;
        }
    }

    DoPlanClicked() {
        this.onDoPlan.emit();
    }
}
