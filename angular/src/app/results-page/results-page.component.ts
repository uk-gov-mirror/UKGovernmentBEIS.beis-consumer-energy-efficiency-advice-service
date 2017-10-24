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
    private rdSapInput: RdSapInput;

    recommendations: EnergySavingRecommendation[];
    energyCalculations: EnergyCalculations;
    isLoading: boolean;
    isError: boolean;

    constructor(
        private responseData: ResponseData,
        private energyCalculationApiService: EnergyCalculationApiService
    ) {
        this.rdSapInput = new RdSapInput(responseData);
    }

    ngOnInit() {
        this.isLoading = true;
        this.isError = false;
        this.energyCalculationApiService.fetchEnergyCalculation(this.rdSapInput)
            .subscribe(
                response => this.handleEnergyCalculationResponse(response),
                error => this.displayErrorMessage(error)
            );
    }

    private handleEnergyCalculationResponse(response: EnergyCalculationResponse) {
        this.isLoading = false;
        const allRecommendations = _.keys(response.measures)
            .map(measureCode => new EnergySavingRecommendation(measureCode, response.measures[measureCode]));
        this.recommendations = _.orderBy(allRecommendations, ['costSavingPoundsPerYear'], ['desc'])
            .filter(recommendation => !!recommendation.recommendationType);
        const potentialEnergyBillSavingPoundsPerYear = _.chain(this.recommendations)
            .map(recommendation => recommendation.costSavingPoundsPerYear)
            .sum()
            .value();
        this.energyCalculations = new EnergyCalculations(response, potentialEnergyBillSavingPoundsPerYear);
    }

    private displayErrorMessage(error) {
        this.isLoading = false;
        this.isError = true;
    }
}
