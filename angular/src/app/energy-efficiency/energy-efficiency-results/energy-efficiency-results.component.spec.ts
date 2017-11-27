import {async, ComponentFixture, getTestBed, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs/Observable";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";

import {EnergyCalculationResponse} from "../../shared/energy-calculation-api-service/response/energy-calculation-response";
import {ResponseData} from "../../shared/response-data/response-data";
import {EnergyCalculationApiService} from "../../shared/energy-calculation-api-service/energy-calculation-api-service";
import {GrantCardComponent} from "../../grants/grant-card/grant-card.component";
import {LocalAuthority} from "../../shared/local-authority-service/local-authority";
import {LocalAuthorityService} from "../../shared/local-authority-service/local-authority.service";
import {EnergyEfficiencyResultsComponent} from "./energy-efficiency-results.component";
import {NationalGrantViewModel} from "../../grants/model/national-grant-view-model";
import {GrantEligibility} from "../../grants/grant-eligibility-service/grant-eligibility";
import {GrantViewModel} from "../../grants/model/grant-view-model";
import {MeasureContent} from "../../shared/energy-saving-measure-content-service/measure-content";
import {UserJourneyType} from "../../shared/response-data/user-journey-type";
import {TenureType} from "../../questionnaire/questions/tenure-type-question/tenure-type";
import {HomeType} from "../../questionnaire/questions/home-type-question/home-type";
import {HomeAge} from "../../questionnaire/questions/home-age-question/home-age";
import {FlatPosition} from "../../questionnaire/questions/flat-position-question/flat-position";
import {FloorAreaUnit} from "../../questionnaire/questions/floor-area-question/floor-area-unit";
import {FuelType} from "../../questionnaire/questions/fuel-type-question/fuel-type";
import {ShowerType} from "../../questionnaire/questions/shower-type-question/shower-type";
import {Benefits} from "../../questionnaire/questions/benefits-question/benefits";
import {GlazingType, RoofType, WallType} from "../../questionnaire/questions/construction-question/construction-types";
import {WaterTankSpace} from "../../questionnaire/questions/water-tank-question/water-tank-space";
import {GardenAccessibility} from "../../questionnaire/questions/garden-question/garden-accessibility";
import {RoofSpace} from "../../questionnaire/questions/roof-space-question/roof-space";
import {LocalAuthorityGrantViewModel} from "../../grants/model/local-authority-grant-view-model";
import {EnergyEfficiencyRecommendationCardComponent} from "./energy-efficiency-recommendation-card/energy-efficiency-recommendation-card.component";
import {DataCardComponent} from "./data-card/data-card.component";
import {SpinnerAndErrorContainerComponent} from "../../shared/spinner-and-error-container/spinner-and-error-container.component";
import {NeedHelpComponent} from "../../shared/need-help/need-help.component";
import {EnergySavingMeasureContentService} from "../../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";
import {GrantEligibilityService} from "../../grants/grant-eligibility-service/grant-eligibility.service";
import {RdSapInput} from "../../shared/energy-calculation-api-service/request/rdsap-input";
import {RecommendationFilterControlComponent} from "./recommendation-filter-control/recommendation-filter-control.component";
import {EnergyEfficiencyRecommendationTag} from "./recommendation-tags/energy-efficiency-recommendation-tag";

describe('EnergyEfficiencyResultsComponent', () => {
    let component: EnergyEfficiencyResultsComponent;
    let injector: TestBed;
    let fixture: ComponentFixture<EnergyEfficiencyResultsComponent>;
    const dummyEnergyCalculations = require('assets/test/energy-calculation-response.json');
    let energyCalculationResponse: Observable<EnergyCalculationResponse>;
    let energyCalculationApiServiceStub = {
        fetchEnergyCalculation: () => energyCalculationResponse
    };
    const localAuthorityCode = "E09000033";
    const localAuthorityName = "Westminster";

    const nationalGrants: NationalGrantViewModel[] = [
        {
            name: 'National Grant 1',
            description: 'some national grant',
            eligibility: GrantEligibility.MayBeEligible,
            shouldDisplayWithoutMeasures: true,
            annualPaymentPounds: 120,
            linkedMeasureCodes: ['V2']
        },
        {
            name: 'National Grant 2',
            description: 'another national grant',
            eligibility: GrantEligibility.MayBeEligible,
            shouldDisplayWithoutMeasures: true,
            annualPaymentPounds: 120,
            linkedMeasureCodes: []
        }
    ];

    let localAuthorityResponse: Observable<LocalAuthority>;
    const localAuthorityServiceStub = {
        fetchLocalAuthorityDetails: () => localAuthorityResponse
    };

    let grantsResponse: Observable<GrantViewModel[]>;
    const grantsEligibilityServiceStub = {
        getApplicableGrants: () => grantsResponse
    };

    const dummyMeasures = require('assets/test/measures-response.json');
    let measuresResponse: Observable<MeasureContent[]>;
    let measuresServiceStub = {
        fetchMeasureDetails: () => measuresResponse
    };

    const responseData: ResponseData = {
        userJourneyType: UserJourneyType.Calculator,
        shouldIncludeGrantsQuestionnaire: false,
        shouldIncludeOptionalPropertyQuestions: false,
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
        floorArea: undefined,
        floorAreaUnit: FloorAreaUnit.SquareMetre,
        fuelType: FuelType.MainsGas,
        condensingBoiler: false,
        electricityTariff: undefined,
        heatingCost: undefined,
        lengthOfHeatingOn: undefined,
        detailedLengthOfHeatingOnEarlyHours: undefined,
        detailedLengthOfHeatingOnMorning: undefined,
        detailedLengthOfHeatingOnAfternoon: undefined,
        detailedLengthOfHeatingOnEvening: undefined,
        numberOfAdultsAgedUnder64: 1,
        numberOfAdultsAged64To80: 0,
        numberOfAdultsAgedOver80: 0,
        numberOfChildren: 2,
        showerType: ShowerType.None,
        numberOfShowersPerWeek: 0,
        numberOfBathsPerWeek: 45,
        tumbleDryPercentage: undefined,
        numberOfFridgeFreezers: 0,
        numberOfFridges: 0,
        numberOfFreezers: 0,
        livingRoomTemperature: 20,
        benefits: Benefits.None,
        income: 1234567,
        roofType: RoofType.DoNotKnow,
        wallType: WallType.DoNotKnow,
        glazingType: GlazingType.Double,
        waterTankSpace: WaterTankSpace.Sufficient,
        gardenAccessibility: GardenAccessibility.NotAccessible,
        gardenSizeSquareMetres: 100,
        roofSpace: RoofSpace.NoSpace,
        numberOfAdults: 1
    };


    beforeEach(async(() => {
        measuresResponse = Observable.of(dummyMeasures);
        energyCalculationResponse = Observable.of(dummyEnergyCalculations);
        grantsResponse = Observable.of(nationalGrants);
        localAuthorityResponse = Observable.of({
            name: localAuthorityName,
            isEcoFlexActive: true,
            ecoFlexMoreInfoLink: 'http://www.example.com',
            grants: [
                new LocalAuthorityGrantViewModel({
                    display_name: 'LA Grant 1',
                    description: 'some local grant'
                }),
                new LocalAuthorityGrantViewModel({
                    display_name: 'LA Grant 2',
                    description: 'another local grant'
                })
            ]
        });

        spyOn(grantsEligibilityServiceStub, 'getApplicableGrants').and.callThrough();
        spyOn(energyCalculationApiServiceStub, 'fetchEnergyCalculation').and.callThrough();
        spyOn(measuresServiceStub, 'fetchMeasureDetails').and.callThrough();
        spyOn(localAuthorityServiceStub, 'fetchLocalAuthorityDetails').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [
                EnergyEfficiencyResultsComponent,
                EnergyEfficiencyRecommendationCardComponent,
                DataCardComponent,
                SpinnerAndErrorContainerComponent,
                NeedHelpComponent,
                GrantCardComponent,
                RecommendationFilterControlComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                {provide: ResponseData, useValue: responseData},
                {provide: EnergyCalculationApiService, useValue: energyCalculationApiServiceStub},
                {provide: EnergySavingMeasureContentService, useValue: measuresServiceStub},
                {provide: GrantEligibilityService, useValue: grantsEligibilityServiceStub},
                {provide: LocalAuthorityService, useValue: localAuthorityServiceStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EnergyEfficiencyResultsComponent);
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

    it('should initialise with the recommendations list collapsed', () => {
        // when
        fixture.detectChanges();

        // then
        const recommendationElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(EnergyEfficiencyRecommendationCardComponent));
        expect(recommendationElements.length).toBe(5);
    });

    it('should not display the filter controls when recommendations list is collapsed', () => {
        // when
        fixture.detectChanges();

        // then
        const filterControlsComponent = fixture.debugElement.query(By.directive(RecommendationFilterControlComponent));
        expect(filterControlsComponent).toBeFalsy();
    });

    it('should apply filters when the recommendations list is expanded', () => {
        // given
        fixture.detectChanges();
        component.toggleRecommendationListState();
        fixture.detectChanges();

        // when
        component.activeTagFilters = EnergyEfficiencyRecommendationTag.Grant;
        fixture.detectChanges();

        // then
        const recommendationElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(EnergyEfficiencyRecommendationCardComponent));
        expect(recommendationElements.length).toEqual(nationalGrants.length);
    });

    it('should apply multiple filters additively', async(() => {
        // given
        fixture.detectChanges();
        component.toggleRecommendationListState();
        fixture.detectChanges();

        // when
        component.activeTagFilters = EnergyEfficiencyRecommendationTag.QuickWin | EnergyEfficiencyRecommendationTag.LongerTerm;
        fixture.detectChanges();

        // then
        const recommendationElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(EnergyEfficiencyRecommendationCardComponent));
        expect(recommendationElements.length).toEqual(0);
    }));

    it('should display home improvement measures correctly', () => {
        // given
        const expectedMeasures = Object.values(dummyEnergyCalculations.measures)
            .map(measure => [measure.cost_saving, measure.energy_saving]);

        // when
        fixture.detectChanges();

        // then
        const recommendationElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(EnergyEfficiencyRecommendationCardComponent));
        const actualMeasures = recommendationElements
            .map(el => el.componentInstance.recommendation)
            .filter(rec => rec.tags & EnergyEfficiencyRecommendationTag.LongerTerm)
            .map(rec => [rec.costSavingPoundsPerYear, rec.energySavingKwhPerYear]);

        actualMeasures.forEach(measure => expect(expectedMeasures).toContain(measure));
    });

    it('should sort recommendations by cost saving descending', () => {
        // when
        fixture.detectChanges();

        // then
        // match data in assets/test/energy-calculation-response.json
        expect(component.getDisplayedRecommendations()[0].costSavingPoundsPerYear).toBe(536.18);
        expect(component.getDisplayedRecommendations()[0].energySavingKwhPerYear).toBe(0);
    });

    it('should display recommendation details correctly', () => {
        // when
        fixture.detectChanges();

        // then
        // match data in assets/test/energy-calculation-response.json and assets/test/recommendations-response.json
        // for measure code V2
        expect(component.getDisplayedRecommendations()[0].headline).toBe('Wind turbine on mast');
        expect(component.getDisplayedRecommendations()[0].readMoreRoute).toContain('home-improvements/wind-turbine-on-mast');
        expect(component.getDisplayedRecommendations()[0].iconClassName).toBe(EnergySavingMeasureContentService.measureIcons['V2']);
    });

    it('should link recommendation to available grant', () => {
        // when
        fixture.detectChanges();

        // then
        // match data in assets/test/energy-calculation-response.json and assets/test/recommendations-response.json
        // for measure code V2
        expect(component.getDisplayedRecommendations()[0].grants.length).toBe(1);
        expect(component.getDisplayedRecommendations()[0].grants[0].name).toBe('National Grant 1');
    });

    it('should display energy calculations correctly', () => {
        // when
        fixture.detectChanges();

        // then
        // match data in assets/test/energy-calculation-response.json, and annual savings from national grants above
        expect(component.energyCalculations.currentEpcRating).toBe('B');
        expect(component.energyCalculations.currentEnergyBillPoundsPerYear).toBe(786);
        expect(component.energyCalculations.potentialEnergyBillSavingPoundsPerYear).toBe(2129);
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

    it('should call measures metadata API service', () => {
        // when
        fixture.detectChanges();

        // then
        expect(injector.get(EnergySavingMeasureContentService).fetchMeasureDetails).toHaveBeenCalled();
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
});
