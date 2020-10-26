import {Component, OnInit} from '@angular/core';
import {ResponseData} from '../../shared/response-data/response-data';
import {EnergyEfficiencyRecommendation} from '../../shared/recommendations-service/energy-efficiency-recommendation';
import {LocalAuthorityService} from '../../shared/local-authority-service/local-authority.service';
import {LocalAuthority} from '../../shared/local-authority-service/local-authority';
import {RecommendationsService} from '../../shared/recommendations-service/recommendations.service';
import {LocalAuthorityGrant} from '../../grants/model/local-authority-grant';
import * as logger from 'loglevel';
import {EnergyEfficiencyDisplayService} from "../../shared/energy-efficiency-display-service/energy-efficiency-display.service";
import {PageTitleService} from "../../shared/page-title-service/page-title.service";
import {EnergyEfficiencyRecommendationTag} from "../energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag";
import {GreenHomesGrantService} from "../../green-homes-grant/green-homes-grant-service/green-homes-grant.service";

@Component({
    selector: 'app-your-plan-page',
    templateUrl: './your-plan-page.component.html',
    styleUrls: ['./your-plan-page.component.scss']
})
export class YourPlanPageComponent implements OnInit {

    localAuthorityGrants: LocalAuthorityGrant[] = [];
    localAuthorityName: string;
    isError: boolean = false;
    errorMessage: string;
    shouldShowGhgContext: boolean = false;

    constructor(private recommendationsService: RecommendationsService,
                private localAuthorityService: LocalAuthorityService,
                private responseData: ResponseData,
                private energyEfficiencyDisplayService: EnergyEfficiencyDisplayService,
                private pageTitle: PageTitleService,
                private greenHomesGrantService: GreenHomesGrantService) {
    }

    get userRecommendations(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getUserRecommendationsInPlan();
    }

    get landlordRecommendations(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getLandlordRecommendationsInPlan();
    }

    get numberOfRecommendations(): number {
        return this.energyEfficiencyDisplayService.getApparentNumberOfRecommendations();
    }

    get numberOfPrimaryRecommendations(): number {
        return this.recommendationsService.getRecommendationsInPlan().filter(
            r => r.tags.includes(EnergyEfficiencyRecommendationTag.GHGPrimary)
        ).length;
    }

    get numberOfSecondaryRecommendations(): number {
        return this.recommendationsService.getRecommendationsInPlan().filter(
            r => r.tags.includes(EnergyEfficiencyRecommendationTag.GHGSecondary)
        ).length;
    }

    // TODO SEA-218: work out what to do here
    get ghgDiscountProportion(): string {
        return this.ghgEligibility === GreenHomesGrantEligibility.FullyEligible
            ? "100%" : "2/3";
    }

    get ghgMaximumAmount(): string {
        return this.ghgEligibility === GreenHomesGrantEligibility.FullyEligible
            ? "10,000" : "5,000";
    }


    ngOnInit() {
        this.pageTitle.set('Your Plan');
        if (!this.energyEfficiencyDisplayService.getActualNumberOfRecommendations()) {
            this.errorMessage = "Sorry, we can't show you your plan at the moment " +
                "as it seems that you have not completed the questionnaire, " +
                "or something has gone wrong.";
            this.isError = true;
            return;
        }

        this.localAuthorityService.fetchLocalAuthorityDetails(this.responseData.localAuthorityCode)
            .subscribe(
                response => this.handleLocalAuthorityServiceResponse(response),
                error => this.handleLocalAuthorityServiceError(error)
            );

        this.shouldShowGhgContext = this.greenHomesGrantService.shouldShowGhgContext() &&
            this.recommendationsService.getUserRecommendationsInPlan()
                .concat(this.recommendationsService.getLandlordRecommendationsInPlan())
                .some(
                    recommendation => GreenHomesGrantService.hasGHGTag(recommendation.tags)
                );
    }

    handleLocalAuthorityServiceResponse(response: LocalAuthority) {
        this.localAuthorityGrants = response.grants;
        this.localAuthorityName = response.name;
    }

    handleLocalAuthorityServiceError(err: Error) {
        logger.error(err.message);
    }
}
