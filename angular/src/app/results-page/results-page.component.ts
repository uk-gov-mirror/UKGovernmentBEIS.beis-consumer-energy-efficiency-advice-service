import {Component, OnInit} from "@angular/core";
import {EnergyCalculationApiService} from "../common/energy-calculation-api-service/energy-calculation-api-service";
import {ResponseData} from "../common/response-data/response-data";
import {RdSapInput} from "../common/energy-calculation-api-service/request/rdsap-input";
import {EnergySavingRecommendation} from "./recommendation-card/energy-saving-recommendation";
import {EnergyCalculationResponse} from "../common/energy-calculation-api-service/response/energy-calculation-response";
import * as _ from "lodash";
import {EnergyCalculations} from "./potentials/energy-calculations";
import {LocalAuthorityService} from "./local-authority-service/local-authority.service";
import {GrantResponse, LocalAuthorityResponse} from "./local-authority-service/local-authority-response";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";

@Component({
    selector: 'app-results-page',
    templateUrl: './results-page.component.html',
    styleUrls: ['./results-page.component.scss']
})
export class ResultsPageComponent implements OnInit {
    recommendations: EnergySavingRecommendation[];
    energyCalculations: EnergyCalculations;
    localAuthorityName: string;
    availableGrants: GrantResponse[];
    isLoading: boolean;
    isError: boolean;

    constructor(private responseData: ResponseData,
                private energyCalculationApiService: EnergyCalculationApiService,
                private localAuthorityService: LocalAuthorityService) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.isError = false;
        Observable.forkJoin(
            this.energyCalculationApiService.fetchEnergyCalculation(new RdSapInput(this.responseData)),
            this.localAuthorityService.fetchLocalAuthorityDetails(this.responseData.localAuthorityCode)
        )
            .subscribe(
                ([energyCalculation, localAuthority]) => {
                    this.handleEnergyCalculationResponse(energyCalculation);
                    this.handleLocalAuthorityResponse(localAuthority);
                },
                () => this.displayErrorMessage(),
                () => this.onLoadingComplete());
    }

    private handleEnergyCalculationResponse(response: EnergyCalculationResponse) {
        this.isLoading = false;
        const allRecommendations = _.keys(response.measures)
            .map(measureCode => new EnergySavingRecommendation(measureCode, response.measures[measureCode]));
        this.recommendations = _.orderBy(allRecommendations, ['costSavingPoundsPerYear'], ['desc'])
            .filter(recommendation => !!recommendation.recommendationType);
        const potentialEnergyBillSavingPoundsPerYear = _.sumBy(
            this.recommendations,
            recommendation => recommendation.costSavingPoundsPerYear
        );
        this.energyCalculations = new EnergyCalculations(response, potentialEnergyBillSavingPoundsPerYear);
    }

    private handleLocalAuthorityResponse(response: LocalAuthorityResponse) {
        this.localAuthorityName = response.display_name;
        this.availableGrants = response.grants;
    }

    private displayErrorMessage() {
        this.isLoading = false;
        this.isError = true;
    }

    private onLoadingComplete() {
        this.isLoading = false;
    }
}
