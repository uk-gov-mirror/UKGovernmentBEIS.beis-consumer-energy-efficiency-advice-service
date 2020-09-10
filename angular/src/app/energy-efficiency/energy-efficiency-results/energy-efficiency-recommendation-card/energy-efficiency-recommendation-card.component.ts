import {Component, Input, OnInit} from '@angular/core';
import {EnergyEfficiencyRecommendation} from '../../../shared/recommendations-service/energy-efficiency-recommendation';
import {
    EnergyEfficiencyRecommendationTag,
    getTagClassName,
    getTagDescription
} from '../recommendation-tags/energy-efficiency-recommendation-tag';
import {GoogleAnalyticsService} from '../../../shared/analytics/google-analytics.service';
import {EnergyEfficiencyRecommendationService} from "../../../shared/recommendations-service/energy-efficiency-recommendation.service";
import {EnergyEfficiencyDisplayService} from "../../../shared/energy-efficiency-display-service/energy-efficiency-display.service";

@Component({
    selector: 'app-energy-efficiency-recommendation-card',
    templateUrl: './energy-efficiency-recommendation-card.component.html',
    styleUrls: ['./energy-efficiency-recommendation-card.component.scss']
})
export class EnergyEfficiencyRecommendationCardComponent implements OnInit {
    @Input() recommendation: EnergyEfficiencyRecommendation;
    @Input() showMonthlySavings: boolean = true;
    @Input() showAddToPlanColumn: boolean = true;
    @Input() ghgEligible: boolean = true;

    isExpandedView: boolean = false;
    investmentRequiredString: string;
    tags: EnergyEfficiencyRecommendationTag[];
    isMouseOverAddToPlanButton: boolean = false;
    isFocusedAddToPlanButton: boolean = false;
    savingDisplay: string;
    displayableTags: EnergyEfficiencyRecommendationTag[];

    private static readonly alwaysDisplayableTags = [
        EnergyEfficiencyRecommendationTag.Grant,
        EnergyEfficiencyRecommendationTag.FundingAvailable
    ];
    private static readonly ghgOnlyTags = [
        EnergyEfficiencyRecommendationTag.GHGPrimary,
        EnergyEfficiencyRecommendationTag.GHGSecondary
    ];

    constructor(private energyEfficiencyDisplayService: EnergyEfficiencyDisplayService,
                private googleAnalyticsService: GoogleAnalyticsService) {
    }

    ngOnInit() {
        this.investmentRequiredString = this.recommendation.installationCost.getInvestmentRequiredString();
        this.initTags();
        this.savingDisplay = EnergyEfficiencyRecommendationService.getSavingDisplay(this.recommendation, this.showMonthlySavings);
    }

    initTags() {
        this.displayableTags = EnergyEfficiencyRecommendationCardComponent.alwaysDisplayableTags;

        if (this.ghgEligible) {
            this.displayableTags = this.displayableTags.concat(EnergyEfficiencyRecommendationCardComponent.ghgOnlyTags);
        }

        this.tags = this.recommendation.tags.filter(t => this.displayableTags.includes(t));
        console.log("Recommendations: ", this.recommendation.tags);
        console.log("Displayed tags: ", this.tags);
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

    get showRemove() {
        return this.isMouseOverAddToPlanButton || this.isFocusedAddToPlanButton;
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
