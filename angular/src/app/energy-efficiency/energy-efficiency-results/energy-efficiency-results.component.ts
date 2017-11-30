import {Component, OnInit} from "@angular/core";
import {ResponseData} from "../../shared/response-data/response-data";
import {EnergyCalculationResponse} from "../../shared/energy-calculation-api-service/response/energy-calculation-response";
import {EnergyCalculations} from "./energy-calculations";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";
import sumBy from "lodash-es/sumBy";
import {GrantViewModel} from "../../grants/model/grant-view-model";
import {EnergyEfficiencyRecommendation} from "../../shared/recommendations-service/energy-efficiency-recommendation";
import {LocalAuthorityService} from "../../shared/local-authority-service/local-authority.service";
import {LocalAuthority} from "../../shared/local-authority-service/local-authority";
import {EnergyEfficiencyRecommendationTag} from "./recommendation-tags/energy-efficiency-recommendation-tag";
import {RecommendationsService} from "../../shared/recommendations-service/recommendations.service";
import {EnergyCalculationApiService} from "../../shared/energy-calculation-api-service/energy-calculation-api-service";
import {RdSapInput} from "../../shared/energy-calculation-api-service/request/rdsap-input";

@Component({
    selector: 'app-energy-efficiency-results-page',
    templateUrl: './energy-efficiency-results.component.html',
    styleUrls: ['./energy-efficiency-results.component.scss']
})
export class EnergyEfficiencyResultsComponent implements OnInit {

    private static RECOMMENDATIONS_TO_DISPLAY_WHEN_MINIMISED: number = 5;

    localGrants: GrantViewModel[];
    energyCalculations: EnergyCalculations;
    localAuthorityName: string;

    isLoading: boolean = true;
    isError: boolean = false;
    recommendationListState: RecommendationsListStates;
    RecommendationListStates = RecommendationsListStates;
    activeTagFilters: EnergyEfficiencyRecommendationTag = EnergyEfficiencyRecommendationTag.None;
    allRecommendations: EnergyEfficiencyRecommendation[] = [];

    constructor(private responseData: ResponseData,
                private recommendationsService: RecommendationsService,
                private localAuthorityService: LocalAuthorityService,
                private energyCalculationService: EnergyCalculationApiService) {
    }

    ngOnInit() {
        Observable.forkJoin(
            this.recommendationsService.getAllRecommendations(),
            this.localAuthorityService.fetchLocalAuthorityDetails(this.responseData.localAuthorityCode),
            this.energyCalculationService.fetchEnergyCalculation(new RdSapInput(this.responseData))
        )
            .subscribe(
                ([allRecommendations, localAuthority, energyCalculationResponse]) =>
                    this.onLoadingComplete(allRecommendations, localAuthority, energyCalculationResponse),
                (err) => this.displayErrorMessage(err),
            );
    }

    getDisplayedRecommendations(): EnergyEfficiencyRecommendation[] {
        if (this.recommendationListState === RecommendationsListStates.Collapsed) {
            return this.allRecommendations
                .slice(0, EnergyEfficiencyResultsComponent.RECOMMENDATIONS_TO_DISPLAY_WHEN_MINIMISED);
        } else {
            return this.allRecommendations
                .filter(recommendation => {
                    const requiredTags = this.activeTagFilters;
                    const matchingTags = requiredTags & recommendation.tags;
                    return matchingTags === requiredTags;
                });
        }
    }

    toggleRecommendationListState(): void {
        switch (this.recommendationListState) {
            case RecommendationsListStates.Collapsed: {
                this.recommendationListState = RecommendationsListStates.Expanded;
                break;
            }
            case RecommendationsListStates.Expanded: {
                this.recommendationListState = RecommendationsListStates.Collapsed;
                this.activeTagFilters = EnergyEfficiencyRecommendationTag.None;
                break;
            }
        }
    }

    getRecommendationListButtonText(): string {
        if (this.recommendationListState === RecommendationsListStates.Collapsed) {
            const extraRecommendationsAvailable = this.allRecommendations.length -
                EnergyEfficiencyResultsComponent.RECOMMENDATIONS_TO_DISPLAY_WHEN_MINIMISED;
            if (extraRecommendationsAvailable === 1) {
                return 'There is 1 more recommendation available. See all ▼';
            }
            return `There are ${extraRecommendationsAvailable} more recommendations available. See all ▼`;
        } else {
            return `Show the top ${EnergyEfficiencyResultsComponent.RECOMMENDATIONS_TO_DISPLAY_WHEN_MINIMISED} recommendations ▲`;
        }
    }

    getRecommendationsInPlan(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getRecommendationsInPlan();
    }

    private displayErrorMessage(err: any): void {
        console.error(err);
        this.isLoading = false;
        this.isError = true;
    }

    private onLoadingComplete(
        allRecommendations: EnergyEfficiencyRecommendation[],
        localAuthority: LocalAuthority,
        energyCalculationResponse: EnergyCalculationResponse
    ) {
        this.allRecommendations = allRecommendations;
        this.localAuthorityName = localAuthority.name;
        this.localGrants = localAuthority.grants;
        this.energyCalculations = EnergyEfficiencyResultsComponent.getEnergyCalculations(
            energyCalculationResponse,
            this.allRecommendations
        );
        this.recommendationListState =
            this.allRecommendations.length > EnergyEfficiencyResultsComponent.RECOMMENDATIONS_TO_DISPLAY_WHEN_MINIMISED ?
                RecommendationsListStates.Collapsed : RecommendationsListStates.CannotExpand;
        this.isLoading = false;
    }

    private static getEnergyCalculations(energyCalculationResponse: EnergyCalculationResponse,
                                         recommendations: EnergyEfficiencyRecommendation[]): EnergyCalculations {
        const potentialEnergyBillSavingPoundsPerYear = sumBy(
            recommendations,
            recommendation => recommendation.costSavingPoundsPerYear
        );
        return new EnergyCalculations(energyCalculationResponse, potentialEnergyBillSavingPoundsPerYear);
    }
}

enum RecommendationsListStates {
    Collapsed,
    Expanded,
    CannotExpand
}

