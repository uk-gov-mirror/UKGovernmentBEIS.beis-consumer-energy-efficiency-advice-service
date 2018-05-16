import {Component, OnInit} from '@angular/core';
import {EnergyCalculationApiService} from '../../shared/energy-calculation-api-service/energy-calculation-api-service';
import {isComplete, ResponseData} from '../../shared/response-data/response-data';
import {EnergyCalculationResponse} from '../../shared/energy-calculation-api-service/response/energy-calculation-response';
import {EnergyCalculations} from './energy-calculations';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import sumBy from 'lodash-es/sumBy';
import {EnergyEfficiencyRecommendation} from '../../shared/recommendations-service/energy-efficiency-recommendation';
import {RecommendationsService} from '../../shared/recommendations-service/recommendations.service';
import {RdSapInput} from '../../shared/energy-calculation-api-service/request/rdsap-input';
import {UserStateService} from '../../shared/user-state-service/user-state-service';
import {TenureType} from '../../questionnaire/questions/tenure-type-question/tenure-type';
import {GoogleAnalyticsService} from '../../shared/analytics/google-analytics.service';
import {AbTestingService} from '../../shared/analytics/ab-testing.service';

@Component({
    selector: 'app-energy-efficiency-results-page',
    templateUrl: './energy-efficiency-results.component.html',
    styleUrls: ['./energy-efficiency-results.component.scss']
})
export class EnergyEfficiencyResultsComponent implements OnInit {

    energyCalculations: EnergyCalculations;

    isLoading: boolean = true;
    isError: boolean = false;
    errorMessage: string = "Something went wrong and we can't load this page right now. Please try again later.";
    showOldVersion: boolean;

    private allRecommendations: EnergyEfficiencyRecommendation[] = [];

    constructor(private responseData: ResponseData,
                private recommendationsService: RecommendationsService,
                private energyCalculationService: EnergyCalculationApiService,
                private userStateService: UserStateService,
                private googleAnalyticsService: GoogleAnalyticsService,
                private abTestingService: AbTestingService) {
    }

    ngOnInit() {
        if (!isComplete(this.responseData)) {
            this.errorMessage = "Sorry, we can't show you results as it seems that you have " +
                "not completed the questionnaire, or something has gone wrong.";
            this.isError = true;
            return;
        }

        Observable.forkJoin(
            this.recommendationsService.getAllRecommendations(),
            this.energyCalculationService.fetchEnergyCalculation(new RdSapInput(this.responseData))
        )
            .subscribe(
                ([allRecommendations, energyCalculationResponse]) =>
                    this.onLoadingComplete(allRecommendations, energyCalculationResponse),
                (err) => {
                    this.errorMessage = "Sorry, we couldn't find any recommendations for you";
                    this.displayErrorMessage(err);
                },
            );
        this.userStateService.saveState();

        this.showOldVersion = this.abTestingService.isInGroupA();
    }

    getDisplayedRecommendations(): EnergyEfficiencyRecommendation[] {
        return this.allRecommendations;
    }

    get showMonthlySavings() {
        return this.responseData.tenureType !== TenureType.OwnerOccupancy;
    }

    sendEventToAnalytics(eventName: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'results-page');
    }

    private displayErrorMessage(err: any): void {
        console.error(err);
        this.isLoading = false;
        this.isError = true;
    }

    private onLoadingComplete(
        allRecommendations: EnergyEfficiencyRecommendation[],
        energyCalculationResponse: EnergyCalculationResponse
    ) {
        this.allRecommendations = allRecommendations;
        this.energyCalculations = EnergyEfficiencyResultsComponent.getEnergyCalculations(
            energyCalculationResponse,
            this.allRecommendations
        );
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
