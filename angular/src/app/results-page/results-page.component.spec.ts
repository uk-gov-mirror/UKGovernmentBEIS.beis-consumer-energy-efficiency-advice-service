import {async, ComponentFixture, TestBed, getTestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";

import {ResultsPageComponent} from "./results-page.component";
import {GrantCardComponent} from "../shared/grant-card/grant-card.component";
import {PotentialsComponent} from "./potentials/potentials.component";
import {RecommendationCardComponent} from "../shared/recommendation-card/recommendation-card.component";
import {ResponseData} from "../shared/response-data/response-data";
import {EnergyCalculationResponse} from "../shared/energy-calculation-api-service/response/energy-calculation-response";
import {EnergyCalculationApiService} from "../shared/energy-calculation-api-service/energy-calculation-api-service";
import {Observable} from "rxjs/Observable";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {RdSapInput} from "../shared/energy-calculation-api-service/request/rdsap-input";
import {HomeType} from "../questionnaire/questions/home-type-question/home-type";
import {HomeAge} from "../questionnaire/questions/home-age-question/home-age";
import {FlatPosition} from "../questionnaire/questions/flat-position-question/flat-position";
import {FuelType} from "../questionnaire/questions/fuel-type-question/fuel-type";
import {LocalAuthorityService} from "../shared/local-authority-service/local-authority.service";
import {QuestionnaireService} from "../questionnaire/questionnaire.service";
import {UserJourneyType} from "../shared/response-data/user-journey-type";
import {SpinnerAndErrorContainerComponent} from "../shared/spinner-and-error-container/spinner-and-error-container.component";
import {RadialPercentageComponent} from "../shared/radial-percentage/radial-percentage.component";
import {LatestNewsCardComponent} from "../shared/latest-news-card/latest-news-card.component";
import {ShowerType} from "../questionnaire/questions/shower-type-question/shower-type";
import {TenureType} from "../questionnaire/questions/tenure-type-question/tenure-type";
import {NeedHelpComponent} from "../shared/need-help/need-help.component";
import {Benefits} from "../questionnaire/questions/benefits-question/benefits";
import {MeasureService} from "../shared/recommendation-service/measure.service";
import {MeasureMetadataResponse} from "../shared/recommendation-service/measure-metadata-response";
import {GrantEligibility} from "../shared/grants-eligibility/grant-eligibility";
import {LocalAuthority} from "../shared/local-authority-service/local-authority";
import {LocalAuthorityGrantViewModel} from "../shared/grant/local-authority-grant-view-model";
import {NationalGrantViewModel} from "../shared/grant/national-grant-view-model";
import {GrantViewModel} from "../shared/grant/grant-view-model";
import {GrantsEligibilityService} from "../shared/grants-eligibility/grants-eligibility.service";

describe('ResultsPageComponent', () => {
    let component: ResultsPageComponent;
    let injector: TestBed;
    let fixture: ComponentFixture<ResultsPageComponent>;
    const dummyEnergyCalculations = require('assets/test/energy-calculation-response.json');
    let energyCalculationResponse: Observable<EnergyCalculationResponse>;
    let energyCalculationApiServiceStub = {
        fetchEnergyCalculation: () => energyCalculationResponse
    };
    const localAuthorityCode = "E09000033";
    const localAuthorityName = "Westminster";
    const localAuthorityGrants: LocalAuthorityGrantViewModel[] = [
        {
            name: 'LA Grant 1',
            description: 'some local grant',
            eligibility: GrantEligibility.MayBeEligible
        },
        {
            name: 'LA Grant 2',
            description: 'another local grant',
            eligibility: GrantEligibility.MayBeEligible
        }
    ];

    const nationalGrants: NationalGrantViewModel[] = [
        {
            name: 'National Grant 1',
            description: 'some national grant',
            eligibility: GrantEligibility.MayBeEligible
        },
        {
            name: 'National Grant 2',
            description: 'another national grant',
            eligibility: GrantEligibility.MayBeEligible
        }
    ];

    let grantsResponse: Observable<GrantViewModel[]>;
    const grantsEligibilityServiceStub = {
        getApplicableGrants: () => grantsResponse
    };


    let localAuthorityResponse: Observable<LocalAuthority>;
    let localAuthorityServiceStub = {
        fetchLocalAuthorityDetails: () => localAuthorityResponse
    };

    const dummyMeasures = require('assets/test/measures-response.json');
    let measuresResponse: Observable<MeasureMetadataResponse[]>;
    let measuresServiceStub = {
        fetchMeasureDetails: () => measuresResponse
    };

    const mockQuestionnaireService = {
        isComplete: (name: string) => false
    };

    const responseData: ResponseData = {
        userJourneyType: UserJourneyType.Calculator,
        shouldIncludeGrantsQuestionnaire: false,
        postcode: 'sw1h0et',
        epc: null,
        localAuthorityCode: localAuthorityCode,
        confirmEpc: true,
        tenureType: TenureType.OwnerOccupancy,
        homeType: HomeType.GroundFloorFlat,
        homeAge: HomeAge.pre1900,
        flatPosition: FlatPosition.ThreeSidesExposed,
        numberOfStoreys: 1,
        numberOfBedrooms: 1,
        fuelType: FuelType.MainsGas,
        condensingBoiler: false,
        electricityTariff: undefined,
        numberOfAdultsAgedUnder64: 1,
        numberOfAdultsAged64To80: 0,
        numberOfAdultsAgedOver80: 0,
        numberOfChildren: 2,
        showerType: ShowerType.None,
        numberOfShowersPerWeek: 0,
        numberOfBathsPerWeek: 45,
        numberOfFridgeFreezers: 0,
        numberOfFridges: 0,
        numberOfFreezers: 0,
        livingRoomTemperature: 20,
        benefits: Benefits.None,
        income: 1234567
    };

    beforeEach(async(() => {
        measuresResponse = Observable.of(dummyMeasures);
        localAuthorityResponse = Observable.of({
            name: localAuthorityName,
            isEcoFlexActive: true,
            ecoFlexMoreInfoLink: 'http://www.example.com',
            grants: localAuthorityGrants
        });
        energyCalculationResponse = Observable.of(dummyEnergyCalculations);
        grantsResponse = Observable.of(nationalGrants);

        spyOn(grantsEligibilityServiceStub, 'getApplicableGrants').and.callThrough();
        spyOn(localAuthorityServiceStub, 'fetchLocalAuthorityDetails').and.callThrough();
        spyOn(energyCalculationApiServiceStub, 'fetchEnergyCalculation').and.callThrough();
        spyOn(measuresServiceStub, 'fetchMeasureDetails').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [
                ResultsPageComponent,
                PotentialsComponent,
                RecommendationCardComponent,
                GrantCardComponent,
                LatestNewsCardComponent,
                SpinnerAndErrorContainerComponent,
                RadialPercentageComponent,
                NeedHelpComponent,
            ],
            imports: [
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                {provide: ResponseData, useValue: responseData},
                {provide: EnergyCalculationApiService, useValue: energyCalculationApiServiceStub},
                {provide: LocalAuthorityService, useValue: localAuthorityServiceStub},
                {provide: QuestionnaireService, useValue: mockQuestionnaireService},
                {provide: MeasureService, useValue: measuresServiceStub},
                {provide: GrantsEligibilityService, useValue: grantsEligibilityServiceStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResultsPageComponent);
        injector = getTestBed();
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call energy calculation API service with response data', () => {
        // given
        const energyCalculationService = injector.get(EnergyCalculationApiService);

        // when
        fixture.detectChanges();

        // then
        expect(energyCalculationService.fetchEnergyCalculation)
            .toHaveBeenCalledWith(new RdSapInput(responseData));
    });

    it('should display an error message if API responds with an error', () => {
        // given
        energyCalculationResponse = ErrorObservable.create('some error text');

        // when
        fixture.detectChanges();

        // then
        expect(component.isLoading).toBeFalsy();
        expect(component.isError).toBeTruthy();
    });

    it('should display the correct number of recommendations', () => {
        // given
        const expectedMeasures = Object.values(dummyEnergyCalculations.measures)
            .map(measure => [measure.cost_saving, measure.energy_saving]);

        // when
        fixture.detectChanges();

        // then
        const recommendationElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(RecommendationCardComponent));
        const actualMeasures = recommendationElements
            .map(el => el.componentInstance.recommendation)
            .map(rec => [rec.costSavingPoundsPerYear, rec.energySavingKwhPerYear]);

        expect(actualMeasures.length).toBe(component.displayedRecommendations);
        actualMeasures.forEach(measure => expect(expectedMeasures).toContain(measure));
    });

    it('should sort recommendations by cost saving descending', () => {
        // when
        fixture.detectChanges();

        // then
        // match data in assets/test/energy-calculation-response.json
        expect(component.recommendations[0].costSavingPoundsPerYear).toBe(536.18);
        expect(component.recommendations[0].energySavingKwhPerYear).toBe(0);
    });

    it('should display recommendation details correctly', () => {
        // when
        fixture.detectChanges();

        // then
        // match data in assets/test/energy-calculation-response.json and assets/test/recommendations-response.json
        // for measure code V2
        expect(component.recommendations[0].headline).toBe('Wind turbine on mast');
        expect(component.recommendations[0].readMoreRoute).toContain('home-improvements/wind-turbine-on-mast');
        expect(component.recommendations[0].iconClassName).toBe(MeasureService.measureIcons['V2']);
    });

    it('should display energy calculations correctly', () => {
        // when
        fixture.detectChanges();

        // then
        // match data in assets/test/energy-calculation-response.json
        expect(component.energyCalculations.currentEpcRating).toBe('B');
        expect(component.energyCalculations.currentEnergyBillPoundsPerYear).toBe(786);
        expect(component.energyCalculations.potentialEnergyBillSavingPoundsPerYear).toBe(1889);
    });

    it('should call local authority API service with code from response data', () => {
        // when
        fixture.detectChanges();

        // then
        expect(injector.get(LocalAuthorityService).fetchLocalAuthorityDetails)
            .toHaveBeenCalledWith(localAuthorityCode);
    });

    it('should display an error message if local authority API responds with an error', () => {
        // given
        localAuthorityResponse = ErrorObservable.create('some error text');

        // when
        fixture.detectChanges();

        // then
        expect(fixture.debugElement.query(By.css('.page-error-container'))).toBeTruthy();
    });

    it('should display correct local authority name', () => {
        // when
        fixture.detectChanges();

        // then
        const localAuthorityNameElement = fixture.debugElement.query(By.css('.grants .local-authority')).nativeElement;
        expect(localAuthorityNameElement.innerText.toLowerCase()).toContain(localAuthorityName.toLowerCase());
    });

    it('should call measures metadata API service', () => {
        // when
        fixture.detectChanges();

        // then
        expect(injector.get(MeasureService).fetchMeasureDetails).toHaveBeenCalled();
    });

    it('should display an error if measures metadata API responds with an error', () => {
        // given
        measuresResponse = ErrorObservable.create('some error text');

        // when
        fixture.detectChanges();

        // when
        expect(component.isLoading).toBeFalsy();
        expect(component.isError).toBeTruthy();
    });

    it('should display all linked pages', () => {
        // when
        fixture.detectChanges();

        // match data in assets/test/recommendations-response.json
        expect(component.featuredPages.length).toBe(4);
    });
});
