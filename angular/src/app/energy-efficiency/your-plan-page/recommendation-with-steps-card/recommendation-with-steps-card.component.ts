import {Component, Input, OnInit} from '@angular/core';
import {EnergyEfficiencyRecommendation} from "../../../shared/recommendations-service/energy-efficiency-recommendation";
import {EnergyEfficiencyRecommendationService} from "../../../shared/recommendations-service/energy-efficiency-recommendation.service";
import {TenureType} from "../../../questionnaire/questions/tenure-type-question/tenure-type";
import {ResponseData} from "../../../shared/response-data/response-data";
import {GoogleAnalyticsService} from "../../../shared/analytics/google-analytics.service";
import {Installer} from "../../../shared/installer-search-service/installer-response";
import {
    EnergyEfficiencyRecommendationTag,
    getTagClassName,
    getTagDescription
} from "../../energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag";

@Component({
    selector: 'app-recommendation-with-steps-card',
    templateUrl: './recommendation-with-steps-card.component.html',
    styleUrls: ['./recommendation-with-steps-card.component.scss']
})
export class RecommendationWithStepsCardComponent implements OnInit {

    displayableTags: EnergyEfficiencyRecommendationTag[];

    @Input() recommendation: EnergyEfficiencyRecommendation;

    installers: Installer[] = [];

    constructor(private responseData: ResponseData,
                private googleAnalyticsService: GoogleAnalyticsService) {
    }

    ngOnInit() {
        this.displayableTags = [];
    }

    getInvestmentRequiredString() {
        return this.recommendation.installationCost.getInvestmentRequiredString();
    }

    get showMonthlySavings() {
        return this.responseData.tenureType !== TenureType.OwnerOccupancy;
    }

    getSavingDisplay(recommendation: EnergyEfficiencyRecommendation) {
        return EnergyEfficiencyRecommendationService.getSavingDisplay(recommendation, this.showMonthlySavings);
    }

    sendEventToAnalytics(eventName: string, eventLabel?: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'plan-page', eventLabel);
    }

    getTagsToDisplay() {
        return this.recommendation.tags.filter(t => this.displayableTags.includes(t));
    }

    getTagClassName(tag: EnergyEfficiencyRecommendationTag) {
        return getTagClassName(tag);
    }

    getTagDescription(tag: EnergyEfficiencyRecommendationTag) {
        return getTagDescription(tag);
    }
}
