import {Component, Input} from '@angular/core';
import {EnergyEfficiencyRecommendation} from "../../../shared/recommendations-service/energy-efficiency-recommendation";
import {RoundingService} from "../../../shared/rounding-service/rounding.service";
import {EnergyEfficiencyRecommendationService} from "../../../shared/recommendations-service/energy-efficiency-recommendation.service";
import {TenureType} from "../../../questionnaire/questions/tenure-type-question/tenure-type";
import {ResponseData} from "../../../shared/response-data/response-data";
import {GoogleAnalyticsService} from "../../../shared/analytics/google-analytics.service";
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
export class RecommendationWithStepsCardComponent {

    @Input() recommendation: EnergyEfficiencyRecommendation;

    constructor(private responseData: ResponseData,
                private googleAnalyticsService: GoogleAnalyticsService) {
    }

    getRoundedInvestment(recommendation: EnergyEfficiencyRecommendation) {
        return RoundingService.roundCostValue(recommendation.investmentPounds);
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

    hasGHGPrimaryTag() {
        return this.recommendation.tags & EnergyEfficiencyRecommendationTag.GHGPrimary;
    }

    hasGHGSecondaryTag() {
        return this.recommendation.tags & EnergyEfficiencyRecommendationTag.GHGSecondary;
    }

    getGHGPrimaryClassName() {
        return getTagClassName(EnergyEfficiencyRecommendationTag.GHGPrimary);
    }

    getGHGSecondaryClassName() {
        return getTagClassName(EnergyEfficiencyRecommendationTag.GHGSecondary);
    }

    getGHGPrimaryDescription() {
        return getTagDescription(EnergyEfficiencyRecommendationTag.GHGSecondary);
    }

    getGHGSecondaryDescription() {
        return getTagDescription(EnergyEfficiencyRecommendationTag.GHGSecondary);
    }
}
