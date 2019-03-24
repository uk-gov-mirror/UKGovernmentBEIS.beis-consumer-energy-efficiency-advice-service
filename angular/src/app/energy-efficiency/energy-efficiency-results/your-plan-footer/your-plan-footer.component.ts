import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {EnergyEfficiencyRecommendation} from '../../../shared/recommendations-service/energy-efficiency-recommendation';
import {RecommendationsService} from '../../../shared/recommendations-service/recommendations.service';
import {AbTestingService} from '../../../shared/analytics/ab-testing.service';
import min from 'lodash-es/min';

@Component({
    selector: 'app-your-plan-footer',
    templateUrl: './your-plan-footer.component.html',
    styleUrls: ['./your-plan-footer.component.scss']
})
export class YourPlanFooterComponent implements OnInit {
    showOldVersion: boolean;

    @Output() onDoPlan: EventEmitter<null> = new EventEmitter<null>();

    get userRecommendations(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getUserRecommendationsInPlan();
    }

    get landlordRecommendations(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getLandlordRecommendationsInPlan();
    }

    get numberOfRecommendations(): number {
        // Treat landlord recommendations as one recommendation because the user has added a combine recommendation
        // in the previous page
        return this.userRecommendations.length + min([this.landlordRecommendations.length, 1]);
    }

    private get recommendations(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getRecommendationsInPlan();
    }

    constructor(private recommendationsService: RecommendationsService,
                private abTestingService: AbTestingService) {
    }

    ngOnInit() {
        this.showOldVersion = this.abTestingService.isInGroupA();
    }

    getYouHaveAddedRecommendations() {
        if (this.recommendations.length === 1) {
            return 'You have added 1 recommendation';
        } else {
            return `You have added ${this.numberOfRecommendations} recommendations`;
        }
    }

    DoPlanClicked() {
        this.onDoPlan.emit();
    }
}
