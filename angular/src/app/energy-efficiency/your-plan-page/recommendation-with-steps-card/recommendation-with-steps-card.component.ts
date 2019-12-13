import {Component, Input, OnInit} from '@angular/core';
import {EnergyEfficiencyRecommendation} from "../../../shared/recommendations-service/energy-efficiency-recommendation";
import {RoundingService} from "../../../shared/rounding-service/rounding.service";
import {EnergyEfficiencyRecommendationService} from "../../../shared/recommendations-service/energy-efficiency-recommendation.service";
import {TenureType} from "../../../questionnaire/questions/tenure-type-question/tenure-type";
import {ResponseData} from "../../../shared/response-data/response-data";
import {GoogleAnalyticsService} from "../../../shared/analytics/google-analytics.service";
import {AbTestingService} from "../../../shared/analytics/ab-testing.service";

@Component({
    selector: 'app-recommendation-with-steps-card',
    templateUrl: './recommendation-with-steps-card.component.html',
    styleUrls: ['./recommendation-with-steps-card.component.scss']
})
export class RecommendationWithStepsCardComponent implements OnInit {

    @Input() recommendation: EnergyEfficiencyRecommendation;

    showOldVersion: boolean;

    constructor(private responseData: ResponseData,
                private googleAnalyticsService: GoogleAnalyticsService,
                private abTestingService: AbTestingService) {
    }

    ngOnInit() {
        this.showOldVersion = this.abTestingService.isInGroupA();
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
}
