import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { ResultsPageComponent } from './results-page.component';
import {FurtherQuestionsLinkComponent} from "./further-questions-link/further-questions-link.component";
import {GrantCardComponent} from "./grant-card/grant-card.component";
import {PotentialsComponent} from "./potentials/potentials.component";
import {RecommendationCardComponent} from "./recommendation-card/recommendation-card.component";
import {SuggestionCardComponent} from "./suggestion-card/suggestion-card.component";
import {ResponseData} from '../common/response-data/response-data';
import {EnergyCalculationResponse} from '../common/energy-calculation-api-service/response/energy-calculation-response';
import {EnergyCalculationApiService} from "../common/energy-calculation-api-service/energy-calculation-api-service";
import {Observable} from "rxjs/Observable";
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {RdSapInput} from '../common/energy-calculation-api-service/request/rdsap-input';
import {HomeType} from '../questionnaire/questionnaires/home-basics/questions/home-type-question/home-type';
import {HomeAge} from '../questionnaire/questionnaires/home-basics/questions/home-age-question/home-age';
import {FlatPosition} from '../questionnaire/questionnaires/home-basics/questions/flat-position-question/flat-position';
import {FuelType} from '../questionnaire/questionnaires/home-basics/questions/fuel-type-question/fuel-type';
import {LocalAuthorityResponse} from './local-authority-service/local-authority-response';
import {LocalAuthorityService} from './local-authority-service/local-authority.service';
import {By} from "@angular/platform-browser";

describe('ResultsPageComponent', () => {
    let component: ResultsPageComponent;
    let fixture: ComponentFixture<ResultsPageComponent>;
    let energyCalculationResponse: EnergyCalculationResponse;
    let mockEnergyCalculationApiService = {
        fetchEnergyCalculation: () => Observable.of(energyCalculationResponse)
    };
    const localAuthorityCode = "E09000033";
    const localAuthorityName = "Westminster";
    let localAuthorityResponse: LocalAuthorityResponse = {
        local_authority_code: localAuthorityCode,
        display_name: localAuthorityName
    };
    let mockLocalAuthorityService = {
        fetchLocalAuthorityDetails: () => Observable.of(localAuthorityResponse)
    };

    const responseData: ResponseData = {
        postcode: 'sw1h0et',
        epc: null,
        localAuthorityCode: localAuthorityCode,
        confirmEpc: true,
        homeType: HomeType.GroundFloorFlat,
        homeAge: HomeAge.pre1900,
        flatPosition: FlatPosition.ThreeSidesExposed,
        numberOfStoreys: 1,
        numberOfBedrooms: 1,
        fuelType: FuelType.MainsGas,
        condensingBoiler: false,
        electricityTariff: undefined
    };

    function injectMockEnergyCalcApiCallbackAndDetectChanges(fetchEnergyCalculation: () => Observable<EnergyCalculationResponse>) {
        let injectedEnergyCalcService = getInjectedEnergyCalculationService();
        injectedEnergyCalcService.fetchEnergyCalculation = fetchEnergyCalculation;
        spyOn(injectedEnergyCalcService, 'fetchEnergyCalculation').and.callThrough();
        fixture.detectChanges();
    }

    function injectMockLocalAuthorityApiCallbackAndDetectChanges(fetchLocalAuthorityDetails: () => Observable<LocalAuthorityResponse>) {
        let injectedLocalAuthorityService = getInjectedLocalAuthorityService();
        injectedLocalAuthorityService.fetchLocalAuthorityDetails = fetchLocalAuthorityDetails;
        spyOn(injectedLocalAuthorityService, 'fetchLocalAuthorityDetails').and.callThrough();
        fixture.detectChanges();
    }

    function getInjectedEnergyCalculationService() {
        return fixture.debugElement.injector.get(EnergyCalculationApiService);
    }

    function getInjectedLocalAuthorityService() {
        return fixture.debugElement.injector.get(LocalAuthorityService);
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ResultsPageComponent,
                FurtherQuestionsLinkComponent,
                GrantCardComponent,
                PotentialsComponent,
                RecommendationCardComponent,
                SuggestionCardComponent
            ],
            providers: [
                {provide: ResponseData, useValue: responseData},
                {provide: EnergyCalculationApiService, useValue: mockEnergyCalculationApiService },
                {provide: LocalAuthorityService, useValue: mockLocalAuthorityService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResultsPageComponent);
        component = fixture.componentInstance;
        energyCalculationResponse = require('assets/test/energy-calculation-response.json');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call energy calculation API service with response data', () => {
        // when
        injectMockEnergyCalcApiCallbackAndDetectChanges(() => Observable.of(energyCalculationResponse));

        // then
        expect(getInjectedEnergyCalculationService().fetchEnergyCalculation).toHaveBeenCalled();
        expect(getInjectedEnergyCalculationService().fetchEnergyCalculation)
            .toHaveBeenCalledWith(new RdSapInput(responseData));
    });

    it('should display an error message if API responds with an error', () => {
        // given
        const errorResponse = ErrorObservable.create('some error text');

        // when
        injectMockEnergyCalcApiCallbackAndDetectChanges(() => errorResponse);

        // then
        expect(component.isLoading).toBeFalsy();
        expect(component.isError).toBeTruthy();
    });

    it('should display all recommendations', () => {
        // when
        injectMockEnergyCalcApiCallbackAndDetectChanges(() => Observable.of(energyCalculationResponse));

        // then
        // match data in assets/test/energy-calculation-response.json
        expect(component.recommendations.length).toBe(13);
    });

    it('should sort recommendations by cost saving descending', () => {
        // when
        injectMockEnergyCalcApiCallbackAndDetectChanges(() => Observable.of(energyCalculationResponse));

        // then
        // match data in assets/test/energy-calculation-response.json
        expect(component.recommendations[0].recommendationType.description).toBe('Wind turbine on mast');
        expect(component.recommendations[0].costSavingPoundsPerYear).toBe(536.18);
        expect(component.recommendations[0].energySavingKwhPerYear).toBe(0);
    });

    it('should display energy calculations correctly', () => {
        // when
        injectMockEnergyCalcApiCallbackAndDetectChanges(() => Observable.of(energyCalculationResponse));

        // then
        // match data in assets/test/energy-calculation-response.json
        expect(component.energyCalculations.currentEpcRating).toBe('B');
        expect(component.energyCalculations.currentEnergyBillPoundsPerYear).toBe(786);
        expect(component.energyCalculations.potentialEnergyBillSavingPoundsPerYear).toBe(1889);
    });

    it('should call local authority API service with code from response data', () => {
        // when
        injectMockLocalAuthorityApiCallbackAndDetectChanges(() => Observable.of(localAuthorityResponse));

        // then
        expect(getInjectedLocalAuthorityService().fetchLocalAuthorityDetails).toHaveBeenCalled();
        expect(getInjectedLocalAuthorityService().fetchLocalAuthorityDetails)
            .toHaveBeenCalledWith(localAuthorityCode);
    });

    it('should display an error message if API responds with an error', () => {
        // given
        const errorResponse = ErrorObservable.create('some error text');

        // when
        injectMockLocalAuthorityApiCallbackAndDetectChanges(() => errorResponse);

        // then
        expect(component.isLoading).toBeFalsy();
        expect(component.isError).toBeTruthy();
    });

    it('should display correct local authority name', () => {
        // when
        injectMockLocalAuthorityApiCallbackAndDetectChanges(() => Observable.of(localAuthorityResponse));

        // then
        const localAuthorityNameElement = fixture.debugElement.query(By.css('.grants .body-uppercase')).nativeElement;
        expect(localAuthorityNameElement.innerText.toLowerCase()).toContain(localAuthorityName.toLowerCase());
    });
});
