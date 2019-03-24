import {Injectable} from '@angular/core';
import min from 'lodash-es/min';
import {RecommendationsService} from "../recommendations-service/recommendations.service";
import {AbTestingService} from "../analytics/ab-testing.service";

@Injectable()
export class EnergyEfficiencyDisplayService {

    constructor(private recommendationService: RecommendationsService,
                private abTestingService: AbTestingService) {
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

    public getRecommendationCardAddToPlanText(isAddedToPlan: boolean, isMouseOverAddToPlanButton: boolean): string {
        if (!isAddedToPlan) {
            return this.shouldShowOldVersion() ? 'Add to plan' : 'Show me how';
        } else {
            return isMouseOverAddToPlanButton ? 'Remove from plan' : 'Added to plan';
        }
    }

    private shouldShowOldVersion(): boolean {
        return this.abTestingService.isInGroupA();
    }

    private getUserRecommendationsInPlan() {
        return this.recommendationService.getUserRecommendationsInPlan();
    }

    private getLandlordRecommendationsInPlan() {
        return this.recommendationService.getLandlordRecommendationsInPlan();
    }
}
