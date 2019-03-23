import {Component, Input, OnInit} from '@angular/core';
import {EnergyEfficiencyRecommendation} from '../../../shared/recommendations-service/energy-efficiency-recommendation';
import {RoundingService} from '../../../shared/rounding-service/rounding.service';
import {GoogleAnalyticsService} from '../../../shared/analytics/google-analytics.service';
import {RecommendationsService} from '../../../shared/recommendations-service/recommendations.service';
import {AbTestingService} from '../../../shared/analytics/ab-testing.service';
import {EnergyEfficiencyRecommendationService} from "../../../shared/recommendations-service/energy-efficiency-recommendation.service";
import sum from 'lodash-es/sum';
import isEmpty from 'lodash-es/isEmpty';
import join from 'lodash-es/join';


@Component({
    selector: 'app-energy-efficiency-combined-recommendation-card',
    templateUrl: './energy-efficiency-combined-recommendation-card.component.html',
    styleUrls: ['./energy-efficiency-combined-recommendation-card.component.scss']
})
export class EnergyEfficiencyCombinedRecommendationCardComponent implements OnInit {

    isExpandedView: boolean = false;
    roundedInvestmentRequired: number;
    isMouseOverAddToPlanButton: boolean = false;
    showOldVersion: boolean;
    savingDisplay: string;
    // TODO-BOC call it summarised headlines?
    details: string[];

    @Input() recommendations: EnergyEfficiencyRecommendation[];
    @Input() combinedHeadline: string;
    @Input() combinedSummary: string;
    @Input() combinedIconPath: string;
    @Input() showMonthlySavings: boolean = true;
    @Input() showAddToPlanColumn: boolean = true;

    constructor(private recommendationsService: RecommendationsService,
                private googleAnalyticsService: GoogleAnalyticsService,
                private abTestingService: AbTestingService) {
    }

    ngOnInit() {
        this.roundedInvestmentRequired = this.getRoundedInvestmentRequired();
        this.showOldVersion = this.abTestingService.isInGroupA();
        this.savingDisplay = EnergyEfficiencyRecommendationService.getTotalSavingsDisplay(this.recommendations, this.showMonthlySavings);
        this.details = this.getDetails();
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

    isAddedToPlan(): boolean {
        return !isEmpty(this.recommendations) && this.recommendations[0].isAddedToPlan;
    }

    getAddToPlanButtonText(): string {
        if (!this.isAddedToPlan()) {
            // TODO-BOC commonise strings
            return this.showOldVersion ? 'Add to plan' : 'Show me how';
        } else {
            return this.isMouseOverAddToPlanButton ? 'Remove from plan' : 'Added to plan';
        }
    }

    toggleAddedToPlan(): void {
        this.recommendations.forEach(recommendation => {
            recommendation.isAddedToPlan = !recommendation.isAddedToPlan;
        });
        if (this.isAddedToPlan()) {
            this.sendEventToAnalytics('add-to-plan_clicked');
        }
    }

    sendEventToAnalytics(eventName: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'results-page', this.getRecommendationsIDs());
    }

    private getRecommendationsIDs(): string {
        return join(this.recommendations, ', ');
    }

    private getRoundedInvestmentRequired(): number {
        const investmentCosts = this.recommendations
            .map(recommendation => (recommendation.investmentPounds));
        const totalCost = sum(investmentCosts);
        return RoundingService.roundCostValue(totalCost);
    }

    private getDetails(): string[] {
        return this.recommendations
            .map(recommendation => {
                return recommendation.headline;
            });
    }
}
