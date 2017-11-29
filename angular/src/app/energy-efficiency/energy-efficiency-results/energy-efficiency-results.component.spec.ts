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
import {HouseExposedWall,} from "../../questionnaire/questions/house-exposed-wall-question/house-exposed-wall";
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
import {YourPlanComponent} from "./your-plan/your-plan.component";
import {BreakEvenComponent} from "./break-even/break-even.component";
import values from "lodash-es/values";
import {MeasureResponse} from "../../shared/energy-calculation-api-service/response/measure-response";
import {FloorLevel} from "../../questionnaire/questions/floor-level-question/floor-level";
import {FlatExposedWall} from "../../questionnaire/questions/flat-exposed-wall-question/flat-exposed-wall";

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
            linkedMeasureCodes: ['U'],
            advantages: []
        },
        {
            name: 'National Grant 2',
            description: 'another national grant',
            eligibility: GrantEligibility.MayBeEligible,
            shouldDisplayWithoutMeasures: true,
            annualPaymentPounds: 120,
            linkedMeasureCodes: [],
            advantages: []
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
        homeType: HomeType.FlatDuplexOrMaisonette,
        homeAge: HomeAge.pre1900,
        numberOfExposedWallsInFlat: FlatExposedWall.ThreeSidesExposedWholeSide,
        numberOfExposedWallsInHouse: undefined,
        numberOfStoreys: 1,
        numberOfBedrooms: 1,
        floorLevels: [FloorLevel.Ground],
        floorArea: undefined,
        floorAreaUnit: FloorAreaUnit.SquareMetre,
        fuelType: FuelType.MainsGas,
        condensingBoiler: false,
        electricityTariff: undefined,
        heatingCost: undefined,
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
                RecommendationFilterControlComponent,
                BreakEvenComponent,
                YourPlanComponent
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
        const expectedNumberOfElements = nationalGrants.length + nationalGrants[0].linkedMeasureCodes.length;
        expect(recommendationElements.length).toEqual(expectedNumberOfElements);
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

    it('should display all home improvement measures correctly when recommendations list is expanded', () => {
        // given
        const expectedMeasures = values(dummyEnergyCalculations.measures)
            .map((measure: MeasureResponse) => [measure.cost_saving, measure.energy_saving]);

        // when
        fixture.detectChanges();
        expandRecommendationsList();

        // then
        const recommendationElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(EnergyEfficiencyRecommendationCardComponent));
        const actualMeasures = recommendationElements
            .map(el => el.componentInstance.recommendation)
            .map(rec => [rec.costSavingPoundsPerYear, rec.energySavingKwhPerYear]);

        expectedMeasures.forEach(measure => expect(actualMeasures).toContain(measure));
    });

    it('should display all habit measures correctly when recommendations list is expanded', () => {
        // given
        const expectedMeasures = values(dummyEnergyCalculations.habit_measures)
            .map((measure: MeasureResponse) => [measure.cost_saving, measure.energy_saving]);

        // when
        fixture.detectChanges();
        expandRecommendationsList();

        // then
        const recommendationElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(EnergyEfficiencyRecommendationCardComponent));
        const actualMeasures = recommendationElements
            .map(el => el.componentInstance.recommendation)
            .map(rec => [rec.costSavingPoundsPerYear, rec.energySavingKwhPerYear]);

        expectedMeasures.forEach(measure => expect(actualMeasures).toContain(measure));
    });

    it('should sort recommendations by cost saving descending', () => {
        // when
        fixture.detectChanges();

        // then
        // match data in assets/test/energy-calculation-response.json
        expect(component.getDisplayedRecommendations()[0].value.costSavingPoundsPerYear).toBe(230.64);
        expect(component.getDisplayedRecommendations()[0].value.energySavingKwhPerYear).toBe(0);
    });

    it('should display recommendation details correctly', () => {
        // when
        fixture.detectChanges();

        // then
        // match data in assets/test/energy-calculation-response.json and assets/test/measures-response.json
        // for measure code U
        expect(component.getDisplayedRecommendations()[0].value.headline).toBe('Solar photovoltaic panels');
        expect(component.getDisplayedRecommendations()[0].value.readMoreRoute).toContain('home-improvements/solar-photovoltaic-panels');
        expect(component.getDisplayedRecommendations()[0].value.iconClassName).toBe(EnergySavingMeasureContentService.measureIcons['U']);
        expect(component.getDisplayedRecommendations()[0].value.advantages).toEqual(['Green', 'Cost effective']);
        expect(component.getDisplayedRecommendations()[0].value.tags).toEqual(EnergyEfficiencyRecommendationTag.LongerTerm | EnergyEfficiencyRecommendationTag.Grant);
    });

    it('should link recommendation to available grant', () => {
        // when
        fixture.detectChanges();

        // then
        // match data in assets/test/energy-calculation-response.json and assets/test/measures-response.json
        // for measure code U
        expect(component.getDisplayedRecommendations()[0].value.grants.length).toBe(1);
        expect(component.getDisplayedRecommendations()[0].value.grants[0].name).toBe('National Grant 1');
    });

    it('should display energy calculations correctly', () => {
        // when
        fixture.detectChanges();

        // then
        // match data in assets/test/energy-calculation-response.json, and annual savings from national grants above
        expect(component.energyCalculations.currentEpcRating).toBe('F');
        expect(component.energyCalculations.currentEnergyBillPoundsPerYear).toBe(1226);
        expect(component.energyCalculations.potentialEnergyBillSavingPoundsPerYear).toBe(872);
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

    function expandRecommendationsList(): void {
        const expandRecommendationsListButton = fixture.debugElement.query(By.css('.expand-recommendations-list')).nativeElement;
        expandRecommendationsListButton.click();
        fixture.detectChanges();
    }
});
