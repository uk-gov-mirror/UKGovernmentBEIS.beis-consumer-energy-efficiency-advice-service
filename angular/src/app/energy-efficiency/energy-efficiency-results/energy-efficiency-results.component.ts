import {Component, OnInit} from "@angular/core";
import {EnergyCalculationApiService} from "../../shared/energy-calculation-api-service/energy-calculation-api-service";
import {ResponseData} from "../../shared/response-data/response-data";
import {RdSapInput} from "../../shared/energy-calculation-api-service/request/rdsap-input";
import {EnergyCalculationResponse} from "../../shared/energy-calculation-api-service/response/energy-calculation-response";
import {EnergyCalculations} from "./energy-calculations";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";
import keys from "lodash-es/keys";
import orderBy from "lodash-es/orderBy";
import sumBy from "lodash-es/sumBy";
import {GrantViewModel} from "../../grants/model/grant-view-model";
import {GrantEligibilityService} from "../../grants/grant-eligibility-service/grant-eligibility.service";
import {MeasureContent} from "../../shared/energy-saving-measure-content-service/measure-content";
import {EnergySavingMeasureContentService} from "../../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";
import {EnergyEfficiencyRecommendation} from "./energy-efficiency-recommendation-card/energy-efficiency-recommendation";
import {concat} from "lodash-es";
import {LocalAuthorityService} from "../../shared/local-authority-service/local-authority.service";
import {LocalAuthority} from "../../shared/local-authority-service/local-authority";
import {LocalAuthorityGrantViewModel} from "../../grants/model/local-authority-grant-view-model";
import {EnergyEfficiencyRecommendationTag} from "./recommendation-tags/energy-efficiency-recommendation-tag";
import {MeasuresResponse} from "../../shared/energy-calculation-api-service/response/measures-response";
import {MeasureResponse} from "../../shared/energy-calculation-api-service/response/measure-response";

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
    allRecommendations: RecommendationOption[] = [];

    private allAvailableGrants: GrantViewModel[];
    private measuresContent: MeasureContent[];
    private energyCalculationResponse: EnergyCalculationResponse;

    constructor(private responseData: ResponseData,
                private energyCalculationApiService: EnergyCalculationApiService,
                private measureService: EnergySavingMeasureContentService,
                private grantsEligibilityService: GrantEligibilityService,
                private localAuthorityService: LocalAuthorityService) {
    }

    ngOnInit() {
        Observable.forkJoin(
            this.energyCalculationApiService.fetchEnergyCalculation(new RdSapInput(this.responseData)),
            this.measureService.fetchMeasureDetails(),
            this.grantsEligibilityService.getApplicableGrants(),
            this.localAuthorityService.fetchLocalAuthorityDetails(this.responseData.localAuthorityCode)
        )
            .subscribe(
                ([energyCalculation, recommendations, applicableGrants, localAuthority]) => {
                    this.handleEnergyCalculationResponse(energyCalculation);
                    this.handleMeasureResponses(recommendations);
                    this.handleGrantsResponses(applicableGrants);
                    this.handleLocalAuthorityResponse(localAuthority);
                },
                (err) => this.displayErrorMessage(err),
                () => this.onLoadingComplete()
            );
    }

    getDisplayedRecommendations(): RecommendationOption[] {
        if (this.recommendationListState === RecommendationsListStates.Collapsed) {
            return this.allRecommendations
                .slice(0, EnergyEfficiencyResultsComponent.RECOMMENDATIONS_TO_DISPLAY_WHEN_MINIMISED);
        } else {
            return this.allRecommendations
                .filter(recommendation => {
                    const requiredTags = this.activeTagFilters;
                    const matchingTags = requiredTags & recommendation.value.tags;
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
        return this.allRecommendations
            .filter(recommendationOption => recommendationOption.isAddedToPlan)
            .map(recommendationOption => recommendationOption.value);
    }

    private handleEnergyCalculationResponse(response: EnergyCalculationResponse) {
        if (!response) {
            this.displayErrorMessage('Received empty energy calculation response');
        }
        this.energyCalculationResponse = response;
    }

    private handleMeasureResponses(responses: MeasureContent[]) {
        this.measuresContent = responses;
    }

    private handleLocalAuthorityResponse(response: LocalAuthority) {
        this.localAuthorityName = response.name;
    }

    private handleGrantsResponses(grants: GrantViewModel[]) {
        this.allAvailableGrants = grants;
    }

    private displayErrorMessage(err: any): void {
        console.error(err);
        this.isLoading = false;
        this.isError = true;
    }

    private onLoadingComplete() {
        this.allRecommendations = EnergyEfficiencyResultsComponent.getAllRecommendationsOrderedBySaving(
            this.energyCalculationResponse,
            this.allAvailableGrants,
            this.measuresContent
        );
        this.energyCalculations = EnergyEfficiencyResultsComponent.getEnergyCalculations(
            this.energyCalculationResponse,
            this.allRecommendations
        );
        this.localGrants = this.allAvailableGrants.filter(grant => {
            return grant instanceof LocalAuthorityGrantViewModel;
        });
        this.recommendationListState =
            this.allRecommendations.length > EnergyEfficiencyResultsComponent.RECOMMENDATIONS_TO_DISPLAY_WHEN_MINIMISED ?
                RecommendationsListStates.Collapsed : RecommendationsListStates.CannotExpand;
        this.isLoading = false;
    }

    private static getAllRecommendationsOrderedBySaving(energyCalculationResponse: EnergyCalculationResponse,
                                                        availableGrants: GrantViewModel[],
                                                        measuresContent: MeasureContent[]): RecommendationOption[] {
        const homeImprovementRecommendations = EnergyEfficiencyResultsComponent
            .getRecommendationsContent(energyCalculationResponse.measures, measuresContent, availableGrants);
        const habitRecommendations = EnergyEfficiencyResultsComponent
            .getRecommendationsContent(energyCalculationResponse.habit_measures, measuresContent, availableGrants);
        const grantRecommendations = EnergyEfficiencyResultsComponent.getGrantRecommendations(availableGrants);
        const allRecommendations = concat(homeImprovementRecommendations, habitRecommendations, grantRecommendations);
        return orderBy(allRecommendations, ['costSavingPoundsPerYear'], ['desc'])
            .map(recommendation => {
                return {
                    value: recommendation,
                    isAddedToPlan: false
                }
            });
    }

    private static getEnergyCalculations(energyCalculationResponse: EnergyCalculationResponse,
                                         recommendations: RecommendationOption[]): EnergyCalculations {
        const potentialEnergyBillSavingPoundsPerYear = sumBy(
            recommendations,
            recommendation => recommendation.value.costSavingPoundsPerYear
        );
        return new EnergyCalculations(energyCalculationResponse, potentialEnergyBillSavingPoundsPerYear);
    }

    private static getRecommendationsContent(measures: MeasuresResponse<MeasureResponse>,
                                             measuresContent: MeasureContent[],
                                             availableGrants: GrantViewModel[]): EnergyEfficiencyRecommendation[] {
        return keys(measures)
            .map(measureCode => {
                const recommendationMetadata: MeasureContent = measuresContent
                    .find((recommendationTypeDetail) => recommendationTypeDetail.acf.measure_code === measureCode);
                if (!recommendationMetadata) {
                    console.error(`Recommendation with code ${ measureCode } not recognised`);
                    return null;
                }
                const linkedAvailableGrants = availableGrants
                    .filter(grant => grant.linkedMeasureCodes && grant.linkedMeasureCodes.indexOf(measureCode) > -1);
                return EnergyEfficiencyRecommendation.fromMeasure(
                    measures[measureCode],
                    recommendationMetadata,
                    EnergySavingMeasureContentService.measureIcons[measureCode],
                    linkedAvailableGrants
                )
            })
            .filter(measure => measure);
    }

    private static getGrantRecommendations(grants: GrantViewModel[]): EnergyEfficiencyRecommendation[] {
        return grants
            .filter(grant => grant.shouldDisplayWithoutMeasures)
            .map(grant => EnergyEfficiencyRecommendation.fromGrant(grant, 'icon-grant'));
    }
}

enum RecommendationsListStates {
    Collapsed,
    Expanded,
    CannotExpand
}

interface RecommendationOption {
    value: EnergyEfficiencyRecommendation;
    isAddedToPlan: boolean
}