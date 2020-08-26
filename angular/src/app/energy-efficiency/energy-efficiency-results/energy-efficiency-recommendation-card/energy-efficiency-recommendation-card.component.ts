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
import {EnergyEfficiencyRecommendationService} from "../../../shared/recommendations-service/energy-efficiency-recommendation.service";
import {EnergyEfficiencyDisplayService} from "../../../shared/energy-efficiency-display-service/energy-efficiency-display.service";

@Component({
    selector: 'app-energy-efficiency-recommendation-card',
    templateUrl: './energy-efficiency-recommendation-card.component.html',
    styleUrls: ['./energy-efficiency-recommendation-card.component.scss']
})
export class EnergyEfficiencyRecommendationCardComponent implements OnInit {

    isExpandedView: boolean = false;
    investmentRequired: string;
    tags: EnergyEfficiencyRecommendationTag[];
    isMouseOverAddToPlanButton: boolean = false;
    isFocusedAddToPlanButton: boolean = false;
    savingDisplay: string;
    displayableTags: EnergyEfficiencyRecommendationTag[] = [
        EnergyEfficiencyRecommendationTag.Grant,
        EnergyEfficiencyRecommendationTag.FundingAvailable,
        EnergyEfficiencyRecommendationTag.GHGPrimary,
        EnergyEfficiencyRecommendationTag.GHGSecondary
    ];

    @Input() recommendation: EnergyEfficiencyRecommendation;
    @Input() showMonthlySavings: boolean = true;
    @Input() showAddToPlanColumn: boolean = true;

    constructor(private energyEfficiencyDisplayService: EnergyEfficiencyDisplayService,
                private googleAnalyticsService: GoogleAnalyticsService) {
    }

    get showRemove() {
        return this.isMouseOverAddToPlanButton || this.isFocusedAddToPlanButton;
    }

    ngOnInit() {
        this.investmentRequired = this.getInvestmentRequiredString();
        this.tags = getActiveTags(this.recommendation.tags)
            .filter(t => this.displayableTags.includes(t));
        this.savingDisplay = EnergyEfficiencyRecommendationService.getSavingDisplay(this.recommendation, this.showMonthlySavings);
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

    focusAddToPlanButton(): void {
        this.isFocusedAddToPlanButton = true;
    }

    blurAddToPlanButton(): void {
        this.isFocusedAddToPlanButton = false;
    }

    getAddToPlanButtonText(): string {
        return this.energyEfficiencyDisplayService.getRecommendationCardAddToPlanText(
            this.recommendation.isAddedToPlan, this.showRemove
        );
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

    getInvestmentRequiredString() {
        if (this.recommendation.installationCost.installationCostRange) {
            const range = this.recommendation.installationCost.installationCostRange;
            return `£${range.min} - £${range.max}`;
        } else if (this.recommendation.installationCost.estimatedInvestment >= 0) {
            return '£' + RoundingService.roundCostValue(this.recommendation.installationCost.estimatedInvestment);
        } else {
            return '-';
        }
    }
}
