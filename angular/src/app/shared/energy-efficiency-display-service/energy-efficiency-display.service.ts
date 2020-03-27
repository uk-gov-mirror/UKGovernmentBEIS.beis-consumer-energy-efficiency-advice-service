import {Injectable} from '@angular/core';
import min from 'lodash-es/min';
import {RecommendationsService} from "../recommendations-service/recommendations.service";
import {AbTestingService} from "../analytics/ab-testing.service";

@Injectable()
export class EnergyEfficiencyDisplayService {

    constructor(private recommendationService: RecommendationsService) {
    }

    // Treat landlord recommendations as one recommendation
    public getApparentNumberOfRecommendations(): number {
        const numberOfUserRecommendations = this.getUserRecommendationsInPlan().length;
        const numberOfLandlordRecommendations = this.getLandlordRecommendationsInPlan().length;

        return numberOfUserRecommendations + min([numberOfLandlordRecommendations, 1]);
    }

    public getActualNumberOfRecommendations(): number {
        return this.recommendationService.getRecommendationsInPlan().length;
    }

    public getYouHaveAddedRecommendationsInfo(): string {
        if (this.getApparentNumberOfRecommendations() === 1) {
            return 'You have added 1 recommendation';
        } else {
            return `You have added ${this.getApparentNumberOfRecommendations()} recommendations`;
        }
    }

    public getCombinedLandlordRecommendationHeadline(): string {
        return 'Recommendations for your landlord';
    }

    public getRecommendationCardAddToPlanText(isAddedToPlan: boolean, showRemove: boolean): string {
        if (!isAddedToPlan) {
            return 'Show me how';
        } else {
            return showRemove ? 'Remove from plan' : 'Added to plan';
        }
    }

    private getUserRecommendationsInPlan() {
        return this.recommendationService.getUserRecommendationsInPlan();
    }

    private getLandlordRecommendationsInPlan() {
        return this.recommendationService.getLandlordRecommendationsInPlan();
    }
}
