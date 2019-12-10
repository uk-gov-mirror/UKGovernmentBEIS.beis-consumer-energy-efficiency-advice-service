import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {EnergyEfficiencyRecommendation} from '../../../shared/recommendations-service/energy-efficiency-recommendation';
import {
    EnergyEfficiencyRecommendationTag,
    getTags,
    getTagClassName,
    getTagDescription
} from '../recommendation-tags/energy-efficiency-recommendation-tag';
import {RoundingService} from '../../../shared/rounding-service/rounding.service';
import {GoogleAnalyticsService} from '../../../shared/analytics/google-analytics.service';
import {EnergyEfficiencyRecommendationService} from "../../../shared/recommendations-service/energy-efficiency-recommendation.service";
import {EnergyEfficiencyDisplayService} from "../../../shared/energy-efficiency-display-service/energy-efficiency-display.service";

@Component({
    selector: 'app-energy-efficiency-recommendation-larger-improvement-card',
    templateUrl: './energy-efficiency-recommendation-larger-improvement-card.component.html',
    styleUrls: ['./energy-efficiency-recommendation-larger-improvement-card.component.scss']
})
export class EnergyEfficiencyRecommendationLargerImprovementCardComponent implements OnInit {

    isExpandedView: boolean = false;
    roundedInvestmentRequired: number;
    tags: EnergyEfficiencyRecommendationTag[];
    isMouseOverAddToPlanButton: boolean = false;
    savingDisplay: string;
    isExpanded: number;

    @Input() recommendation: EnergyEfficiencyRecommendation;
    @Input() showMonthlySavings: boolean = true;
    @Input() showAddToPlanColumn: boolean = true;
    @Input() stepIndex: number;
    @Output() onAnalyticsEvent: EventEmitter<string> = new EventEmitter<string>();

    constructor(private energyEfficiencyDisplayService: EnergyEfficiencyDisplayService,
                private googleAnalyticsService: GoogleAnalyticsService) {
    }

    ngOnInit() {
        this.roundedInvestmentRequired = RoundingService.roundCostValue(this.recommendation.investmentPounds);
        this.tags = getTags(this.recommendation)
            .filter(t => t === EnergyEfficiencyRecommendationTag.Grant || t === EnergyEfficiencyRecommendationTag.FundingAvailable);
        this.savingDisplay = EnergyEfficiencyRecommendationService.getSavingDisplay(this.recommendation, this.showMonthlySavings);
    }

    toggleIsExpanded(tag: number): void {
        this.isExpanded = tag;
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
        return this.energyEfficiencyDisplayService.getRecommendationCardAddToPlanText(
            this.recommendation.isAddedToPlan, this.isMouseOverAddToPlanButton
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

    sendStepEventToAnalytics(eventName: string, eventLabel?: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'results-page', eventLabel);
    }
}
