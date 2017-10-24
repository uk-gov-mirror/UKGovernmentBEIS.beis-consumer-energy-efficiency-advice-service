import { Component, OnInit } from '@angular/core';
import {EnergyCalculationApiService} from '../common/bre-api-service/energy-calculation-api-service';
import {ResponseData} from '../common/response-data/response-data';
import {RdSapInput} from '../common/bre-api-service/model/rdsap-input/rdsap-input';
import {EnergySavingRecommendation} from './recommendation-card/energy-saving-recommendation';
import {EnergyCalculationResponse} from '../common/bre-api-service/model/energy-calculation-response';
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
        this.energyCalculationApiService.getEnergyCalculation(this.rdSapInput)
            .subscribe(
                response => this.handleEnergyCalculationResponse(response),
                error => this.displayErrorMessage(error)
            );
    }

    private handleEnergyCalculationResponse(response: EnergyCalculationResponse) {
        this.isLoading = false;
        console.log(response);
        const energySavingMeasureResponses = response.measures;
        const allRecommendations = _.keys(energySavingMeasureResponses)
            .map(measureCode => new EnergySavingRecommendation(measureCode, energySavingMeasureResponses[measureCode]));
        this.recommendations = _.orderBy(allRecommendations, ['costSavingPoundsPerYear'], ['desc'])
            .filter(recommendation => !!recommendation.recommendationType);
        const potentialEnergyBillSavingPoundsPerYear = _.chain(this.recommendations)
            .map(recommendation => recommendation.costSavingPoundsPerYear)
            .sum()
            .value();
        this.energyCalculations = new EnergyCalculations(response, potentialEnergyBillSavingPoundsPerYear);
    }

    private displayErrorMessage(error) {
        console.log(error);
        this.isLoading = false;
        this.isError = true;
    }
}
