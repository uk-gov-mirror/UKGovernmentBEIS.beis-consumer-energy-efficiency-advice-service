import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";

import {ResultsPageComponent} from "./results-page.component";
import {FurtherQuestionsLinkComponent} from "./further-questions-link/further-questions-link.component";
import {GrantCardComponent} from "./grant-card/grant-card.component";
import {PotentialsComponent} from "./potentials/potentials.component";
import {RecommendationCardComponent} from "./recommendation-card/recommendation-card.component";
import {SuggestionCardComponent} from "./suggestion-card/suggestion-card.component";
import {ResponseData} from "../shared/response-data/response-data";
import {EnergyCalculationResponse} from "../shared/energy-calculation-api-service/response/energy-calculation-response";
import {EnergyCalculationApiService} from "../shared/energy-calculation-api-service/energy-calculation-api-service";
import {Observable} from "rxjs/Observable";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {RdSapInput} from "../shared/energy-calculation-api-service/request/rdsap-input";
import {HomeType} from "../questionnaire/questionnaires/home-basics/questions/home-type-question/home-type";
import {HomeAge} from "../questionnaire/questionnaires/home-basics/questions/home-age-question/home-age";
import {FlatPosition} from "../questionnaire/questionnaires/home-basics/questions/flat-position-question/flat-position";
import {FuelType} from "../questionnaire/questionnaires/home-basics/questions/fuel-type-question/fuel-type";
import {LocalAuthorityResponse} from "./local-authority-service/local-authority-response";
import {LocalAuthorityService} from "./local-authority-service/local-authority.service";
import {QuestionnaireService} from "../questionnaire/questionnaire.service";
import {RecommendationService} from './recommendation-service/recommendation.service';
import {RecommendationMetadataResponse} from './recommendation-service/recommendation-metadata-response';
import {PageStateService} from "../shared/page-state-service/page-state.service";

describe('ResultsPageComponent', () => {
    let component: ResultsPageComponent;
    let fixture: ComponentFixture<ResultsPageComponent>;
    let energyCalculationResponse: EnergyCalculationResponse;
    let mockEnergyCalculationApiService = {
        fetchEnergyCalculation: () => Observable.create(energyCalculationResponse)
    };
    const localAuthorityCode = "E09000033";
    const localAuthorityName = "Westminster";
    const localAuthorityResponse: LocalAuthorityResponse = {
        local_authority_code: localAuthorityCode,
        display_name: localAuthorityName,
        grants: [
            {display_name: 'Grant 1', description: 'Grant 1'},
            {display_name: 'Grant 2', description: 'Grant 2'},
            {display_name: 'Grant 3', description: 'Grant 3'},
        ]
    };
    let mockLocalAuthorityService = {
        fetchLocalAuthorityDetails: () => Observable.create(localAuthorityResponse)
    };
    const recommendationsResponse = require('assets/test/recommendations-response.json');
    let mockRecommendationService = {
        fetchRecommendationDetails: () => Observable.create(recommendationsResponse)
    };
    const mockPageStateService = {
        showLoading: () => {},
        showGenericErrorAndLogMessage: () => {},
        showLoadingComplete: () => {}
    };

    const mockQuestionnarieService = {
        isComplete: (name: string) => false
    };

    const responseData: ResponseData = {
        postcode: 'sw1h0et',
        epc: null,
        localAuthorityCode: localAuthorityCode,
        confirmEpc: true,
        homeowner: true,
        homeType: HomeType.GroundFloorFlat,
        homeAge: HomeAge.pre1900,
        flatPosition: FlatPosition.ThreeSidesExposed,
        numberOfStoreys: 1,
        numberOfBedrooms: 1,
        fuelType: FuelType.MainsGas,
        condensingBoiler: false,
        electricityTariff: undefined,
        numberOfOccupants: 1,
        numberOfShowersPerWeek: 0,
        numberOfBathsPerWeek: 45,
        numberOfFridgeFreezers: 0,
        numberOfFridges: 0,
        numberOfFreezers: 0,
        livingRoomTemperature: 20
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

    function injectMockRecommendationsApiCallbackAndDetectChanges(fetchRecommendationDetails: () => Observable<RecommendationMetadataResponse[]>) {
        let injectedRecommendationService = getInjectedRecommendationService();
        injectedRecommendationService.fetchRecommendationDetails = fetchRecommendationDetails;
        spyOn(injectedRecommendationService, 'fetchRecommendationDetails').and.callThrough();
        fixture.detectChanges();
    }

    function getInjectedEnergyCalculationService() {
        return fixture.debugElement.injector.get(EnergyCalculationApiService);
    }

    function getInjectedLocalAuthorityService() {
        return fixture.debugElement.injector.get(LocalAuthorityService);
    }

    function getInjectedRecommendationService() {
        return fixture.debugElement.injector.get(RecommendationService);
    }

    beforeEach(async(() => {
        spyOn(mockPageStateService, 'showLoading');
        spyOn(mockPageStateService, 'showGenericErrorAndLogMessage');
        spyOn(mockPageStateService, 'showLoadingComplete');

        TestBed.configureTestingModule({
            declarations: [
                ResultsPageComponent,
                FurtherQuestionsLinkComponent,
                GrantCardComponent,
                PotentialsComponent,
                RecommendationCardComponent,
                SuggestionCardComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                {provide: ResponseData, useValue: responseData},
                {provide: EnergyCalculationApiService, useValue: mockEnergyCalculationApiService},
                {provide: LocalAuthorityService, useValue: mockLocalAuthorityService},
                {provide: QuestionnaireService, useValue: mockQuestionnarieService},
                {provide: RecommendationService, useValue: mockRecommendationService},
                {provide: PageStateService, useValue: mockPageStateService}
            ],
            imports: [RouterTestingModule]
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
        injectMockEnergyCalcApiCallbackAndDetectChanges(() => Observable.create(energyCalculationResponse));

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
        expect(fixture.debugElement.injector.get(PageStateService).showGenericErrorAndLogMessage).toHaveBeenCalled();
    });

    it('should display all recommendations', () => {
        // when
        injectMockEnergyCalcApiCallbackAndDetectChanges(() => Observable.create(energyCalculationResponse));
        const expectedMeasures = Object.values(energyCalculationResponse.measures)
            .map(measure => [measure.cost_saving, measure.energy_saving]);

        // then
        const recommendationElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(RecommendationCardComponent));
        const actualMeasures = recommendationElements
            .map(el => el.componentInstance.recommendation)
            .map(rec => [rec.costSavingPoundsPerYear, rec.energySavingKwhPerYear]);

        expect(actualMeasures.length).toBe(expectedMeasures.length);
        expectedMeasures.forEach(measure => expect(actualMeasures).toContain(measure));
    });

    it('should sort recommendations by cost saving descending', () => {
        // when
        injectMockEnergyCalcApiCallbackAndDetectChanges(() => Observable.create(energyCalculationResponse));

        // then
        // match data in assets/test/energy-calculation-response.json
        expect(component.recommendations[0].costSavingPoundsPerYear).toBe(536.18);
        expect(component.recommendations[0].energySavingKwhPerYear).toBe(0);
    });

    it('should display recommendation details correctly', () => {
        // when
        injectMockEnergyCalcApiCallbackAndDetectChanges(() => Observable.create(energyCalculationResponse));

        // then
        // match data in assets/test/energy-calculation-response.json and assets/test/recommendations-response.json
        // for measure code V2
        expect(component.recommendations[0].headline).toBe('Wind turbine on mast');
        expect(component.recommendations[0].readMorePath).toContain('home-improvements/wind-turbine-on-mast');
        expect(component.recommendations[0].iconClassName).toBe(RecommendationService.recommendationIcons['V2']);
    });

    it('should display energy calculations correctly', () => {
        // when
        injectMockEnergyCalcApiCallbackAndDetectChanges(() => Observable.create(energyCalculationResponse));

        // then
        // match data in assets/test/energy-calculation-response.json
        expect(component.energyCalculations.currentEpcRating).toBe('B');
        expect(component.energyCalculations.currentEnergyBillPoundsPerYear).toBe(786);
        expect(component.energyCalculations.potentialEnergyBillSavingPoundsPerYear).toBe(1889);
    });

    it('should call local authority API service with code from response data', () => {
        // when
        injectMockLocalAuthorityApiCallbackAndDetectChanges(() => Observable.create(localAuthorityResponse));

        // then
        expect(getInjectedLocalAuthorityService().fetchLocalAuthorityDetails).toHaveBeenCalled();
        expect(getInjectedLocalAuthorityService().fetchLocalAuthorityDetails)
            .toHaveBeenCalledWith(localAuthorityCode);
    });

    it('should display an error message if local authority API responds with an error', () => {
        // given
        const errorResponse = ErrorObservable.create('some error text');

        // when
        injectMockLocalAuthorityApiCallbackAndDetectChanges(() => errorResponse);

        // then
        expect(fixture.debugElement.injector.get(PageStateService).showGenericErrorAndLogMessage).toHaveBeenCalled();
    });

    it('should display correct local authority name', () => {
        // when
        injectMockLocalAuthorityApiCallbackAndDetectChanges(() => Observable.create(localAuthorityResponse));

        // then
        const localAuthorityNameElement = fixture.debugElement.query(By.css('.grants .body-uppercase')).nativeElement;
        expect(localAuthorityNameElement.innerText.toLowerCase()).toContain(localAuthorityName.toLowerCase());
    });

    it('should display all grants', () => {
        // when
        injectMockLocalAuthorityApiCallbackAndDetectChanges(() => Observable.create(localAuthorityResponse));

        // then
        const grantElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(GrantCardComponent));
        expect(grantElements.map(el => el.componentInstance.grant)).toEqual(localAuthorityResponse.grants);
    });

    it('should call recommendations metadata API service', () => {
        // when
        injectMockRecommendationsApiCallbackAndDetectChanges(() => Observable.create(recommendationsResponse));

        // when
        expect(getInjectedRecommendationService().fetchRecommendationDetails).toHaveBeenCalled();
    });

    it('should display an error if recommendations metadat API responds with an error', () => {
        // given
        const errorResponse = ErrorObservable.create('some error text');

        // when
        injectMockRecommendationsApiCallbackAndDetectChanges(() => errorResponse);

        // when
        expect(fixture.debugElement.injector.get(PageStateService).showGenericErrorAndLogMessage).toHaveBeenCalled();
    });
});
