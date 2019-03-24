import {Component, Input, OnInit} from '@angular/core';
import {EnergyEfficiencyRecommendation} from '../../../shared/recommendations-service/energy-efficiency-recommendation';
import {RoundingService} from '../../../shared/rounding-service/rounding.service';
import {GoogleAnalyticsService} from '../../../shared/analytics/google-analytics.service';
import {EnergyEfficiencyRecommendationService} from "../../../shared/recommendations-service/energy-efficiency-recommendation.service";
import sum from 'lodash-es/sum';
import isEmpty from 'lodash-es/isEmpty';
import join from 'lodash-es/join';
import every from 'lodash-es/every';
import {EnergyEfficiencyDisplayService} from "../../../shared/energy-efficiency-display-service/energy-efficiency-display.service";


@Component({
    selector: 'app-energy-efficiency-combined-recommendation-card',
    templateUrl: './energy-efficiency-combined-recommendation-card.component.html',
    styleUrls: ['./energy-efficiency-combined-recommendation-card.component.scss']
})
export class EnergyEfficiencyCombinedRecommendationCardComponent implements OnInit {

    isExpandedView: boolean = false;
    roundedInvestmentRequired: number;
    isMouseOverAddToPlanButton: boolean = false;
    savingDisplay: string;
    summarisedHeadlines: string[];

    @Input() recommendations: EnergyEfficiencyRecommendation[];
    @Input() combinedHeadline: string;
    @Input() combinedSummary: string;
    @Input() combinedIconPath: string;
    @Input() showMonthlySavings: boolean = true;
    @Input() showAddToPlanColumn: boolean = true;

    constructor(private energyEfficiencyDisplayService: EnergyEfficiencyDisplayService,
                private googleAnalyticsService: GoogleAnalyticsService) {
    }

    ngOnInit() {
        this.roundedInvestmentRequired = this.getRoundedInvestmentRequired();
        this.savingDisplay = EnergyEfficiencyRecommendationService.getTotalSavingsDisplay(this.recommendations, this.showMonthlySavings);
        this.summarisedHeadlines = this.getSummarisedHeadlines();
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
        return !isEmpty(this.recommendations) && every(this.recommendations, recommendation => recommendation.isAddedToPlan);
    }

    getAddToPlanButtonText(): string {
        return this.energyEfficiencyDisplayService.getRecommendationCardAddToPlanText(
            this.isAddedToPlan(), this.isMouseOverAddToPlanButton
        );
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

    private getSummarisedHeadlines(): string[] {
        return this.recommendations
            .map(recommendation => {
                return recommendation.headline;
            });
    }
}
