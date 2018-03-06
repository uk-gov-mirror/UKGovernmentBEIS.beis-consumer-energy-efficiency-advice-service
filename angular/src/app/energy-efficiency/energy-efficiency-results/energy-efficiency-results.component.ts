import {Component, OnInit, ViewChild} from '@angular/core';
import {EnergyCalculationApiService} from '../../shared/energy-calculation-api-service/energy-calculation-api-service';
import {ResponseData} from '../../shared/response-data/response-data';
import {EnergyCalculationResponse} from '../../shared/energy-calculation-api-service/response/energy-calculation-response';
import {EnergyCalculations} from './energy-calculations';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import sumBy from 'lodash-es/sumBy';
import {EnergyEfficiencyRecommendation} from '../../shared/recommendations-service/energy-efficiency-recommendation';
import {LocalAuthorityService} from '../../shared/local-authority-service/local-authority.service';
import {LocalAuthority} from '../../shared/local-authority-service/local-authority';
import {EnergyEfficiencyRecommendationTag} from './recommendation-tags/energy-efficiency-recommendation-tag';
import {RecommendationsService} from '../../shared/recommendations-service/recommendations.service';
import {RdSapInput} from '../../shared/energy-calculation-api-service/request/rdsap-input';
import {LocalAuthorityGrant} from '../../grants/model/local-authority-grant';
import {StickyRowWrapperComponent} from '../../shared/sticky-row-wrapper/sticky-row-wrapper.component';

@Component({
    selector: 'app-energy-efficiency-results-page',
    templateUrl: './energy-efficiency-results.component.html',
    styleUrls: ['./energy-efficiency-results.component.scss']
})
export class EnergyEfficiencyResultsComponent implements OnInit {

    localGrants: LocalAuthorityGrant[];
    energyCalculations: EnergyCalculations;
    localAuthorityName: string;

    isLoading: boolean = true;
    isError: boolean = false;
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
        return this.allRecommendations
            .filter(recommendation => {
                const requiredTags = this.activeTagFilters;
                if (requiredTags === EnergyEfficiencyRecommendationTag.None) {
                    return true;
                }
                return requiredTags & recommendation.tags;
            });
    }

    getRecommendationsInPlan(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getRecommendationsInPlan();
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
        localAuthority: LocalAuthority,
        energyCalculationResponse: EnergyCalculationResponse
    ) {
        this.allRecommendations = allRecommendations;
        this.activeTagFilters = EnergyEfficiencyRecommendationTag.TopRecommendations;
        this.localAuthorityName = localAuthority.name;
        this.localGrants = localAuthority.grants;
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
