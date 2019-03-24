import {Component, OnInit} from '@angular/core';
import {ResponseData} from '../../shared/response-data/response-data';
import {EnergyEfficiencyRecommendation} from '../../shared/recommendations-service/energy-efficiency-recommendation';
import {LocalAuthorityService} from '../../shared/local-authority-service/local-authority.service';
import {LocalAuthority} from '../../shared/local-authority-service/local-authority';
import {RecommendationsService} from '../../shared/recommendations-service/recommendations.service';
import {LocalAuthorityGrant} from '../../grants/model/local-authority-grant';
import * as logger from 'loglevel';
import {EnergyEfficiencyDisplayService} from "../../shared/energy-efficiency-display-service/energy-efficiency-display.service";

@Component({
    selector: 'app-your-plan-page',
    templateUrl: './your-plan-page.component.html',
    styleUrls: ['./your-plan-page.component.scss']
})
export class YourPlanPageComponent implements OnInit {

    get userRecommendations(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getUserRecommendationsInPlan();
    }

    get landlordRecommendations(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getLandlordRecommendationsInPlan();
    }

    get numberOfRecommendations(): number {
        return this.energyEfficiencyDisplayService.getApparentNumberOfRecommendations();
    }

    localAuthorityGrants: LocalAuthorityGrant[] = [];
    localAuthorityName: string;
    isError: boolean = false;
    errorMessage: string;

    constructor(private recommendationsService: RecommendationsService,
                private localAuthorityService: LocalAuthorityService,
                private responseData: ResponseData,
                private energyEfficiencyDisplayService: EnergyEfficiencyDisplayService) {
    }

    ngOnInit() {
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
    }

    handleLocalAuthorityServiceResponse(response: LocalAuthority) {
        this.localAuthorityGrants = response.grants;
        this.localAuthorityName = response.name;
    }

    handleLocalAuthorityServiceError(err: Error) {
        logger.error(err.message);
    }
}
