import {Component, OnInit, ViewChild} from '@angular/core';
import {EnergyCalculationApiService} from '../../shared/energy-calculation-api-service/energy-calculation-api-service';
import {ResponseData} from '../../shared/response-data/response-data';
import {EnergyCalculationResponse} from '../../shared/energy-calculation-api-service/response/energy-calculation-response';
import {EnergyCalculations} from './energy-calculations';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import sumBy from 'lodash-es/sumBy';
import {EnergyEfficiencyRecommendation} from '../../shared/recommendations-service/energy-efficiency-recommendation';
import {EnergyEfficiencyRecommendationTag} from './recommendation-tags/energy-efficiency-recommendation-tag';
import {RecommendationsService} from '../../shared/recommendations-service/recommendations.service';
import {RdSapInput} from '../../shared/energy-calculation-api-service/request/rdsap-input';
import {StickyRowWrapperComponent} from '../../shared/sticky-row-wrapper/sticky-row-wrapper.component';
import {UserStateService} from '../../shared/user-state-service/user-state-service';
import {TenureType} from '../../questionnaire/questions/tenure-type-question/tenure-type';
import {GoogleAnalyticsService} from "../../shared/analytics/google-analytics.service";

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
    _activeTagFilters: EnergyEfficiencyRecommendationTag = EnergyEfficiencyRecommendationTag.None;

    get activeTagFilters(): EnergyEfficiencyRecommendationTag {
        return this._activeTagFilters;
    }

    set activeTagFilters(val: EnergyEfficiencyRecommendationTag) {
        this._activeTagFilters = val;
        this.onDisplayedRecommendationCardsChanged();
    }

    @ViewChild(StickyRowWrapperComponent) yourPlanFooterWrapperComponent: StickyRowWrapperComponent;

    private allRecommendations: EnergyEfficiencyRecommendation[] = [];

    constructor(private responseData: ResponseData,
                private recommendationsService: RecommendationsService,
                private energyCalculationService: EnergyCalculationApiService,
                private userStateService: UserStateService,
                private googleAnalyticsService: GoogleAnalyticsService) {
    }

    ngOnInit() {
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
    }

    getDisplayedRecommendations(): EnergyEfficiencyRecommendation[] {
        return this.allRecommendations
            .filter(recommendation => {
                const requiredTags = this.activeTagFilters;
                if (requiredTags === EnergyEfficiencyRecommendationTag.None) {
                    return true;
                }
                return requiredTags & recommendation.tags;
            });
    }

    get showMonthlySavings() {
        return this.responseData.tenureType !== TenureType.OwnerOccupancy;
    }

    getRecommendationsInPlan(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getRecommendationsInPlan();
    }

    sendEventToAnalytics(eventName: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'results-page');
    }

    private onDisplayedRecommendationCardsChanged() {
        setTimeout(() => {
            if (this.yourPlanFooterWrapperComponent) {
                this.yourPlanFooterWrapperComponent.updateRowPosition();
            }
        });
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
        this.activeTagFilters = EnergyEfficiencyRecommendationTag.TopRecommendations;
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
