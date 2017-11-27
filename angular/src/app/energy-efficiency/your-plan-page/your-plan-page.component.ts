import {Component, OnInit} from "@angular/core";
import {ResponseData} from "../../shared/response-data/response-data";
import {EnergyEfficiencyRecommendation} from "../recommendations/energy-efficiency-recommendation";
import {LocalAuthorityService} from "../../shared/local-authority-service/local-authority.service";
import {LocalAuthorityGrantViewModel} from "../../grants/model/local-authority-grant-view-model";
import {LocalAuthority} from "../../shared/local-authority-service/local-authority";

@Component({
    selector: 'app-your-plan-page',
    templateUrl: './your-plan-page.component.html',
    styleUrls: ['./your-plan-page.component.scss']
})
export class YourPlanPageComponent implements OnInit {

    get recommendations(): EnergyEfficiencyRecommendation[] {
        return this.responseData.energyEfficiencyRecommendationsInPlan;
    }

    localAuthorityGrants: LocalAuthorityGrantViewModel[] = [];
    localAuthorityName: string;

    constructor(private responseData: ResponseData,
                private localAuthorityService: LocalAuthorityService) {
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

    handleLocalAuthorityServiceError(err: any) {
        console.error(err);
    }
}