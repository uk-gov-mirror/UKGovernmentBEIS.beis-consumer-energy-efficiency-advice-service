import {Component, Input, OnInit} from '@angular/core';
import {EnergyEfficiencyRecommendation} from '../../../shared/recommendations-service/energy-efficiency-recommendation';
import {
    EnergyEfficiencyRecommendationTag,
    getActiveTags,
    getTagClassName,
    getTagDescription
} from '../recommendation-tags/energy-efficiency-recommendation-tag';
import {RoundingService} from '../../../shared/rounding-service/rounding.service';
import {GoogleAnalyticsService} from '../../../shared/analytics/google-analytics.service';
import {AbTestingService} from '../../../shared/analytics/ab-testing.service';

@Component({
    selector: 'app-energy-efficiency-recommendation-card',
    templateUrl: './energy-efficiency-recommendation-card.component.html',
    styleUrls: ['./energy-efficiency-recommendation-card.component.scss']
})
export class EnergyEfficiencyRecommendationCardComponent implements OnInit {

    isExpandedView: boolean = false;
    roundedInvestmentRequired: number;
    roundedSaving: number;
    tags: EnergyEfficiencyRecommendationTag[];
    isMouseOverAddToPlanButton: boolean = false;
    showOldVersion: boolean;

    @Input() recommendation: EnergyEfficiencyRecommendation;
    @Input() showMonthlySavings: boolean = true;

    constructor(private googleAnalyticsService: GoogleAnalyticsService,
                private abTestingService: AbTestingService) {
    }

    ngOnInit() {
        this.roundedInvestmentRequired = RoundingService.roundCostValue(this.recommendation.investmentPounds);
        this.roundedSaving = this.showMonthlySavings
            ? RoundingService.roundCostValue(this.recommendation.costSavingPoundsPerMonth)
            : RoundingService.roundCostValue(this.recommendation.costSavingPoundsPerYear);
        this.tags = getActiveTags(this.recommendation.tags)
            .filter(t => t === EnergyEfficiencyRecommendationTag.Grant || t === EnergyEfficiencyRecommendationTag.FundingAvailable);
        this.showOldVersion = this.abTestingService.isInGroupA();
    }

    getTagDescription(tag: EnergyEfficiencyRecommendationTag) {
        return getTagDescription(tag);
    }

    getTagClassName(tag: EnergyEfficiencyRecommendationTag) {
        return getTagClassName(tag);
    }

    toggleExpandedView(): void {
        this.isExpandedView = !this.isExpandedView;
        if (this.isExpandedView) {
            this.sendEventToAnalytics('see-more_clicked');
        }
    }

    mouseEnterAddToPlanButton(): void {
        this.isMouseOverAddToPlanButton = true;
    }

    mouseLeaveAddToPlanButton(): void {
        this.isMouseOverAddToPlanButton = false;
    }

    getAddToPlanButtonText(): string {
        if (!this.recommendation.isAddedToPlan) {
            return this.showOldVersion ? 'Add to plan' : 'Show me how';
        } else {
            return this.isMouseOverAddToPlanButton ? 'Remove from plan' : 'Added to plan';
        }
    }

    toggleAddedToPlan(): void {
        this.recommendation.isAddedToPlan = !this.recommendation.isAddedToPlan;
        if (this.recommendation.isAddedToPlan) {
            this.sendEventToAnalytics('add-to-plan_clicked');
        }
    }

    sendEventToAnalytics(eventName: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'results-page', this.recommendation.recommendationID);
    }
}
