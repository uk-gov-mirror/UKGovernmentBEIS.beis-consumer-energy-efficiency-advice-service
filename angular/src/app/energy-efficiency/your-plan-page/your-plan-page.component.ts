import {Component, OnInit} from '@angular/core';
import {ResponseData} from '../../shared/response-data/response-data';
import {EnergyEfficiencyRecommendation} from '../../shared/recommendations-service/energy-efficiency-recommendation';
import {LocalAuthorityService} from '../../shared/local-authority-service/local-authority.service';
import {LocalAuthority} from '../../shared/local-authority-service/local-authority';
import {RecommendationsService} from '../../shared/recommendations-service/recommendations.service';
import {LocalAuthorityGrant} from '../../grants/model/local-authority-grant';
import {GoogleAnalyticsService} from "../../shared/analytics/google-analytics.service";
import * as logger from "loglevel";

@Component({
    selector: 'app-your-plan-page',
    templateUrl: './your-plan-page.component.html',
    styleUrls: ['./your-plan-page.component.scss']
})
export class YourPlanPageComponent implements OnInit {

    get recommendations(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getRecommendationsInPlan();
    }

    localAuthorityGrants: LocalAuthorityGrant[] = [];
    localAuthorityName: string;

    constructor(private recommendationsService: RecommendationsService,
                private localAuthorityService: LocalAuthorityService,
                private googleAnalyticsService: GoogleAnalyticsService,
                private responseData: ResponseData) {
    }

    ngOnInit() {
        this.localAuthorityService.fetchLocalAuthorityDetails(this.responseData.localAuthorityCode)
            .subscribe(
                response => this.handleLocalAuthorityServiceResponse(response),
                error => this.handleLocalAuthorityServiceError(error)
            );
    }

    handleLocalAuthorityServiceResponse(response: LocalAuthority) {
        this.localAuthorityGrants = response.grants;
        this.localAuthorityName = response.name;
    }

    handleLocalAuthorityServiceError(err: Error) {
        logger.error(err.message);
    }

    sendEventToAnalytics(eventName: string, eventLabel?: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'plan-page', eventLabel);
    }
}
