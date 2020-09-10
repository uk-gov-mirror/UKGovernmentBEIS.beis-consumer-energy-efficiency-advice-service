import {Component, Input, OnInit} from '@angular/core';
import {EnergyEfficiencyRecommendation} from "../../../shared/recommendations-service/energy-efficiency-recommendation";
import {EnergyEfficiencyRecommendationService} from "../../../shared/recommendations-service/energy-efficiency-recommendation.service";
import {TenureType} from "../../../questionnaire/questions/tenure-type-question/tenure-type";
import {ResponseData} from "../../../shared/response-data/response-data";
import {GoogleAnalyticsService} from "../../../shared/analytics/google-analytics.service";
import {Installer} from "../../../shared/installer-search-service/installer-response";
import {InstallerSearchService} from "../../../shared/installer-search-service/installer-search.service";
import {
    EnergyEfficiencyRecommendationTag,
    getTagClassName,
    getTagDescription, GHG_ONLY_TAGS
} from "../../energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag";
import {GreenHomesGrantService} from "../../../green-homes-grant/green-homes-grant-service/green-homes-grant.service";
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-recommendation-with-steps-card',
    templateUrl: './recommendation-with-steps-card.component.html',
    styleUrls: ['./recommendation-with-steps-card.component.scss']
})
export class RecommendationWithStepsCardComponent implements OnInit {

    displayableTags: EnergyEfficiencyRecommendationTag[] = [];

    @Input() recommendation: EnergyEfficiencyRecommendation;
    @Input() shouldShowGHGContext: boolean = true;

    hasGHGTag: boolean = false;
    loadingInstallerDetails: boolean = false;
    installers: Installer[] = [];

    constructor(private responseData: ResponseData,
                private googleAnalyticsService: GoogleAnalyticsService,
                private installerSearchService: InstallerSearchService) {
    }

    ngOnInit() {
        if (this.shouldShowGHGContext) {
            this.displayableTags = GHG_ONLY_TAGS;
        }
        this.hasGHGTag = GreenHomesGrantService.hasGHGTag(this.recommendation.tags);
        this.loadTrustMarkInstallers();
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

    private loadTrustMarkInstallers() {
        if (this.hasGHGTag && this.recommendation.trustMarkTradeCodes.length) {
            this.loadingInstallerDetails = true;
            this.installerSearchService.fetchInstallerDetails(this.responseData.postcode, this.recommendation.trustMarkTradeCodes)
                .pipe(
                    finalize(() => {
                        this.loadingInstallerDetails = false;
                    })
                ).subscribe(
                    response => {
                        this.installers = response.data.slice(0, 3);
                    },
                    () => {
                        this.installers = [];
                    }
                );
        }
    }
}
