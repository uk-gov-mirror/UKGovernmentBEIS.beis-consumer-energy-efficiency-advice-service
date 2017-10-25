import { Component, OnInit } from '@angular/core';
import {EnergyCalculationApiService} from '../common/energy-calculation-api-service/energy-calculation-api-service';
import {ResponseData} from '../common/response-data/response-data';
import {RdSapInput} from '../common/energy-calculation-api-service/request/rdsap-input';
import {EnergySavingRecommendation} from './recommendation-card/energy-saving-recommendation';
import {EnergyCalculationResponse} from '../common/energy-calculation-api-service/response/energy-calculation-response';
import * as _ from 'lodash';
import {EnergyCalculations} from './potentials/energy-calculations';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss']
})
export class ResultsPageComponent implements OnInit {
    recommendations: EnergySavingRecommendation[];
    energyCalculations: EnergyCalculations;
    isLoading: boolean;
    isError: boolean;

    constructor(
        private responseData: ResponseData,
        private energyCalculationApiService: EnergyCalculationApiService
    ) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.isError = false;
        this.energyCalculationApiService.fetchEnergyCalculation(new RdSapInput(this.responseData))
            .subscribe(
                response => this.handleEnergyCalculationResponse(response),
                () => this.displayErrorMessage()
            );
    }

    private handleEnergyCalculationResponse(response: EnergyCalculationResponse) {
        this.isLoading = false;
        const allRecommendations = _.keys(response.measures)
            .map(measureCode => new EnergySavingRecommendation(measureCode, response.measures[measureCode]));
        this.recommendations = _.orderBy(allRecommendations, ['costSavingPoundsPerYear'], ['desc'])
            .filter(recommendation => !!recommendation.recommendationTypeCode);
        const potentialEnergyBillSavingPoundsPerYear = _.chain(this.recommendations)
            .sumBy(recommendation => recommendation.costSavingPoundsPerYear)
            .value();
        this.energyCalculations = new EnergyCalculations(response, potentialEnergyBillSavingPoundsPerYear);
    }

    private displayErrorMessage() {
        this.isLoading = false;
        this.isError = true;
    }
}
