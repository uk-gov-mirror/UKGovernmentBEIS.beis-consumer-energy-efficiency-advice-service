import {Component, OnInit} from '@angular/core';
import {EnergyCalculationApiService} from '../../shared/energy-calculation-api-service/energy-calculation-api-service';
import {isComplete, ResponseData} from '../../shared/response-data/response-data';
import {EnergyCalculationResponse} from '../../shared/energy-calculation-api-service/response/energy-calculation-response';
import {EnergyCalculations} from './energy-calculations';
import 'rxjs/add/observable/forkJoin';
import sumBy from 'lodash-es/sumBy';
import {EnergyEfficiencyRecommendation} from '../../shared/recommendations-service/energy-efficiency-recommendation';
import {RecommendationsService} from '../../shared/recommendations-service/recommendations.service';
import {RdSapInput} from '../../shared/energy-calculation-api-service/request/rdsap-input';
import {UserStateService} from '../../shared/user-state-service/user-state-service';
import {TenureType} from '../../questionnaire/questions/tenure-type-question/tenure-type';
import {GoogleAnalyticsService} from '../../shared/analytics/google-analytics.service';
import {AbTestingService} from '../../shared/analytics/ab-testing.service';
import {getFuelTypeDescription} from "../../questionnaire/questions/fuel-type-question/fuel-type";
import {getHomePropertyDescription} from "../../shared/home-property-description-helper/home-property-description-helper";
import {EnergyEfficiencyRecommendations} from "../../shared/recommendations-service/energy-efficiency-recommendations";
import {EnergyEfficiencyDisplayService} from "../../shared/energy-efficiency-display-service/energy-efficiency-display.service";
import Config from '../../config';
import {EnergyEfficiencyRecommendationTag, getTags} from "./recommendation-tags/energy-efficiency-recommendation-tag";
import {LocalAuthority} from "../../shared/local-authority-service/local-authority";
import {LocalAuthorityGrant} from "../../grants/model/local-authority-grant";
import {LocalAuthorityService} from "../../shared/local-authority-service/local-authority.service";
import * as logger from 'loglevel';

@Component({
    selector: 'app-energy-efficiency-results-page',
    templateUrl: './energy-efficiency-results.component.html',
    styleUrls: ['./energy-efficiency-results.component.scss']
})
export class EnergyEfficiencyResultsComponent implements OnInit {

    energyCalculations: EnergyCalculations;

    localAuthorityGrants: LocalAuthorityGrant[] = [];
    isLoading: boolean = true;
    isError: boolean = false;
    errorMessage: string = "Something went wrong and we can't load this page right now. Please try again later.";
    showOldVersion: boolean;
    showDefaultRecommendation: boolean = false;
    showDefaultRentalMeasures: boolean = false;
    defaultRecommendationDisclaimer: string;
    tabOpened: string = 'quick-wins';

    private allRecommendations: EnergyEfficiencyRecommendations = new EnergyEfficiencyRecommendations();

    private readonly LANDLORD_RECOMMENDATION_FEATURE_FLAG: boolean = true;

    constructor(private responseData: ResponseData,
                private recommendationsService: RecommendationsService,
                private energyCalculationService: EnergyCalculationApiService,
                private userStateService: UserStateService,
                private googleAnalyticsService: GoogleAnalyticsService,
                private abTestingService: AbTestingService,
                private energyEfficiencyDisplayService: EnergyEfficiencyDisplayService,
                private localAuthorityService: LocalAuthorityService) {
    }

    ngOnInit() {
        if (!isComplete(this.responseData)) {
            this.errorMessage = "Sorry, we can't show you results as it seems that you have " +
                "not completed the questionnaire, or something has gone wrong.";
            this.isError = true;
            return;
        }

        this.energyCalculationService.fetchEnergyCalculation(new RdSapInput(this.responseData))
            .subscribe(energyCalculationResponse => {
                this.recommendationsService.getAllRecommendations(energyCalculationResponse)
                    .subscribe(allRecommendations =>
                        this.onLoadingComplete(allRecommendations, energyCalculationResponse),
                        err => this.handleRecommendationError(err)
                    );
                },
                err => this.handleRecommendationError(err)
            );

        this.userStateService.saveState();

        this.showOldVersion = this.abTestingService.isInGroupA();
        this.localAuthorityService.fetchLocalAuthorityDetails(this.responseData.localAuthorityCode)
            .subscribe(
                response => this.handleLocalAuthorityServiceResponse(response),
                error => this.handleLocalAuthorityServiceError(error)
            );
    }

    handleLocalAuthorityServiceResponse(response: LocalAuthority) {
        this.localAuthorityGrants = response.grants;
    }

    handleLocalAuthorityServiceError(err: Error) {
        logger.error(err.message);
    }

    setTabOpened(tag: string) {
        this.tabOpened = tag;
    }

    getUserRecommendations(tag: string): EnergyEfficiencyRecommendation[] {
        return this.getRecommendations(this.allRecommendations.userRecommendations, tag);
    }

    getLandlordRecommendations(tag: string): EnergyEfficiencyRecommendation[] {
        return this.getRecommendations(this.allRecommendations.landlordRecommendations, tag);
    }

    getRecommendations(recommendations: EnergyEfficiencyRecommendation[], tag: string): EnergyEfficiencyRecommendation[] {
        if (tag.includes('quick-wins')) {
            recommendations = recommendations.filter(t => getTags(t).includes(EnergyEfficiencyRecommendationTag.QuickWin));
        }
        if (tag.includes('larger-improvements')) {
            recommendations = recommendations.filter(t => getTags(t).includes(EnergyEfficiencyRecommendationTag.LongerTerm));
        }
        if (tag.includes('dismiss')) {
            recommendations = recommendations.filter(t => t.dismiss === true);
        } else if (!this.showOldVersion) {
            recommendations = recommendations.filter(t => t.dismiss !== true);
        }
        return recommendations;
    }

    getDismissed(): EnergyEfficiencyRecommendation[] {
        return this.getRecommendations(this.allRecommendations.getAll(), 'dismiss');
    }

    get showMonthlySavings() {
        return this.responseData.tenureType !== TenureType.OwnerOccupancy;
    }

    sendEventToAnalytics(eventName: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'results-page');
    }

    get combinedLandlordRecommendationHeadline(): string {
        return this.energyEfficiencyDisplayService.getCombinedLandlordRecommendationHeadline();
    }

    shouldShowLandlordRecommendation(): boolean {
        return this.LANDLORD_RECOMMENDATION_FEATURE_FLAG;
    }

    sendStepEventToAnalytics(eventName: string, eventLabel?: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'results-page', eventLabel);
    }

    private displayErrorMessage(err: any): void {
        console.error(err);
        this.isLoading = false;
        this.isError = true;
    }

    private onLoadingComplete(
        allRecommendations: EnergyEfficiencyRecommendations,
        energyCalculationResponse: EnergyCalculationResponse
    ) {
        this.allRecommendations = allRecommendations;
        this.energyCalculations = EnergyEfficiencyResultsComponent.getEnergyCalculations(
            energyCalculationResponse,
            this.allRecommendations.userRecommendations
        );
        this.isLoading = false;
        this.showDefaultRecommendation = energyCalculationResponse.isDefaultResponse;
        this.showDefaultRentalMeasures = energyCalculationResponse.default_rental_measures != null;
        this.defaultRecommendationDisclaimer = EnergyEfficiencyResultsComponent.getDefaultRecommendationDisclaimer(this.responseData);
    }

    private handleRecommendationError(err) {
        this.errorMessage = "Sorry, we couldn't find any recommendations for you";
        this.displayErrorMessage(err);
    }

    private static getEnergyCalculations(energyCalculationResponse: EnergyCalculationResponse,
                                         recommendations: EnergyEfficiencyRecommendation[]): EnergyCalculations {
        const potentialEnergyBillSavingPoundsPerYear = sumBy(
            recommendations,
            recommendation => recommendation.costSavingPoundsPerYear
        );
        return new EnergyCalculations(energyCalculationResponse, potentialEnergyBillSavingPoundsPerYear);
    }

    private static getDefaultRecommendationDisclaimer(responseData: ResponseData): string {
        const fuelType = getFuelTypeDescription(responseData.fuelType);
        const homePropertyDescription = getHomePropertyDescription(responseData.homeType, responseData.builtForm);

        return `Sorry, we had trouble generating results for your house. Please try again later. ` +
            `We have put general recommendations for a ${fuelType} heated ${homePropertyDescription} below.`;
    }
}
