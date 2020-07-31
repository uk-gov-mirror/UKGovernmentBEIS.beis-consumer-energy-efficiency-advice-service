import {Component, Input, OnInit} from '@angular/core';
import {EnergyEfficiencyRecommendation} from "../../../shared/recommendations-service/energy-efficiency-recommendation";
import {RoundingService} from "../../../shared/rounding-service/rounding.service";
import {EnergyEfficiencyRecommendationService} from "../../../shared/recommendations-service/energy-efficiency-recommendation.service";
import {TenureType} from "../../../questionnaire/questions/tenure-type-question/tenure-type";
import {ResponseData} from "../../../shared/response-data/response-data";
import {GoogleAnalyticsService} from "../../../shared/analytics/google-analytics.service";
import {Installer} from "../../../shared/installer-search-service/installer-response";
import {InstallerSearchService} from "../../../shared/installer-search-service/installer-search.service";
import {
    EnergyEfficiencyRecommendationTag,
    getTagClassName,
    getTagDescription,
    getActiveTags
} from "../../energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag";

@Component({
    selector: 'app-recommendation-with-steps-card',
    templateUrl: './recommendation-with-steps-card.component.html',
    styleUrls: ['./recommendation-with-steps-card.component.scss']
})
export class RecommendationWithStepsCardComponent implements OnInit {

    displayableTags: EnergyEfficiencyRecommendationTag[] = [
        EnergyEfficiencyRecommendationTag.GHGPrimary,
        EnergyEfficiencyRecommendationTag.GHGSecondary
    ];

    @Input() recommendation: EnergyEfficiencyRecommendation;
    installers: Installer[];

    constructor(private responseData: ResponseData,
                private googleAnalyticsService: GoogleAnalyticsService,
                private installerSearchService: InstallerSearchService) {
    }

    ngOnInit() {
        this.loadTrustMarkInstallers();
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

    getTagsToDisplay() {
        return getActiveTags(this.recommendation.tags).filter(t => this.displayableTags.includes(t));
    }

    getTagClassName(tag: EnergyEfficiencyRecommendationTag) {
        return getTagClassName(tag);
    }

    getTagDescription(tag: EnergyEfficiencyRecommendationTag) {
        return getTagDescription(tag);
    }

    hasGHGTag() {
        const tags = getActiveTags(this.recommendation.tags);
        return tags.includes(EnergyEfficiencyRecommendationTag.GHGPrimary) || tags.includes(EnergyEfficiencyRecommendationTag.GHGSecondary);
    }

    private loadTrustMarkInstallers() {
        if (this.hasGHGTag() && this.recommendation.trustMarkTradeCodes.length) {
            this.installerSearchService.fetchInstallerDetails(this.responseData.postcode, this.recommendation.trustMarkTradeCodes)
                .subscribe(response => {
                    this.installers = response.data.slice(0, 3);
                    console.log(this.installers);
                });
        }
    }
}
