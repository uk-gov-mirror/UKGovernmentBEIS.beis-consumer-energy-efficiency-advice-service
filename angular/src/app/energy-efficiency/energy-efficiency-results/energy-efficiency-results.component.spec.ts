import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs/Observable";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {InlineSVGModule} from "ng-inline-svg";
import {HttpClientTestingModule} from "@angular/common/http/testing";

import {EnergyCalculationResponse} from "../../shared/energy-calculation-api-service/response/energy-calculation-response";
import {ResponseData} from "../../shared/response-data/response-data";
import {EnergyCalculationApiService} from "../../shared/energy-calculation-api-service/energy-calculation-api-service";
import {GrantCardComponent} from "../../shared/grant-card/grant-card.component";
import {LocalAuthority} from "../../shared/local-authority-service/local-authority";
import {LocalAuthorityService} from "../../shared/local-authority-service/local-authority.service";
import {EnergyEfficiencyResultsComponent} from "./energy-efficiency-results.component";
import {GrantEligibility} from "../../grants/grant-eligibility-service/grant-eligibility";
import {LocalAuthorityGrantViewModel} from "../../grants/model/local-authority-grant-view-model";
import {EnergyEfficiencyRecommendationCardComponent} from "./energy-efficiency-recommendation-card/energy-efficiency-recommendation-card.component";
import {DataCardComponent} from "../data-card/data-card.component";
import {SpinnerAndErrorContainerComponent} from "../../shared/spinner-and-error-container/spinner-and-error-container.component";
import {NeedHelpComponent} from "../../shared/need-help/need-help.component";
import {RdSapInput} from "../../shared/energy-calculation-api-service/request/rdsap-input";
import {RecommendationFilterControlComponent} from "./recommendation-filter-control/recommendation-filter-control.component";
import {EnergyEfficiencyRecommendationTag} from "./recommendation-tags/energy-efficiency-recommendation-tag";
import {BreakEvenComponent} from "./break-even/break-even.component";
import {YourPlanSummaryComponent} from "../your-plan-summary/your-plan-summary.component";
import {EnergyEfficiencyRecommendation} from "../../shared/recommendations-service/energy-efficiency-recommendation";
import {RecommendationsService} from "../../shared/recommendations-service/recommendations.service";
import {YourPlanFooterComponent} from "./your-plan-footer/your-plan-footer.component";
import {StickyRowWrapperComponent} from "../../shared/sticky-row-wrapper/sticky-row-wrapper.component";

describe('EnergyEfficiencyResultsComponent', () => {
    let component: EnergyEfficiencyResultsComponent;
    let fixture: ComponentFixture<EnergyEfficiencyResultsComponent>;
    const dummyEnergyCalculations = require('assets/test/energy-calculation-response.json');
    let energyCalculationResponse: Observable<EnergyCalculationResponse>;
    let energyCalculationApiServiceStub = {
        fetchEnergyCalculation: () => energyCalculationResponse
    };
    const localAuthorityCode = "E09000033";
    const localAuthorityName = "Westminster";

    let localAuthorityResponse: Observable<LocalAuthority>;
    const localAuthorityServiceStub = {
        fetchLocalAuthorityDetails: () => localAuthorityResponse
    };

    let recommendationsResponse: Observable<EnergyEfficiencyRecommendation[]>;
    const recommendationsServiceStub = {
        getAllRecommendations: () => recommendationsResponse,
        isAddedToPlan: () => false,
        getRecommendationsInPlan: () => []
    };

    let responseData: ResponseData;

    const recommendations: EnergyEfficiencyRecommendation[] = [
        {
            investmentPounds: 199,
            costSavingPoundsPerYear: 99,
            costSavingPoundsPerMonth: 99 / 12,
            energySavingKwhPerYear: 100,
            readMoreRoute: ('dummy-route'),
            iconClassName: 'dummy-icon',
            headline: 'Loft insulation',
            summary: 'No description available',
            tags: EnergyEfficiencyRecommendationTag.LongerTerm,
            grant: null,
            advantages: [],
            steps: [],
            isAddedToPlan: false
        },
        {
            investmentPounds: 999,
            costSavingPoundsPerYear: 200,
            costSavingPoundsPerMonth: 200 / 12,
            energySavingKwhPerYear: 250,
            readMoreRoute: ('dummy-route'),
            iconClassName: 'dummy-icon',
            headline: 'Solar photovoltaic panels',
            summary: 'No description available',
            tags: EnergyEfficiencyRecommendationTag.LongerTerm,
            grant: null,
            advantages: [],
            steps: [],
            isAddedToPlan: false
        },
        {
            investmentPounds: 20,
            costSavingPoundsPerYear: 10,
            costSavingPoundsPerMonth: 10 / 12,
            energySavingKwhPerYear: 5,
            readMoreRoute: ('dummy-route'),
            iconClassName: 'dummy-icon',
            headline: 'Cylinder insulation',
            summary: 'No description available',
            tags: EnergyEfficiencyRecommendationTag.LongerTerm | EnergyEfficiencyRecommendationTag.Grant,
            grant: {
                grantId: 'national-grant-1',
                name: 'National Grant 1',
                description: 'some national grant',
                eligibility: GrantEligibility.LikelyEligible,
                shouldDisplayWithoutMeasures: true,
                annualPaymentPounds: 120,
                linkedMeasureCodes: ['V2'],
                advantages: null,
                steps: []
            },
            advantages: [],
            steps: [],
            isAddedToPlan: false
        }
    ];

    beforeEach(async(() => {
        energyCalculationResponse = Observable.of(dummyEnergyCalculations);
        recommendationsResponse = Observable.of(recommendations);
        localAuthorityResponse = Observable.of({
            name: localAuthorityName,
            isEcoFlexActive: true,
            ecoFlexMoreInfoLink: 'http://www.example.com',
            grants: [
                new LocalAuthorityGrantViewModel({
                    display_name: 'LA Grant 1',
                    description: 'some local grant',
                    slug: 'la-grant-1'
                }),
                new LocalAuthorityGrantViewModel({
                    display_name: 'LA Grant 2',
                    description: 'another local grant',
                    slug: 'la-grant-1'
                })
            ]
        });

        responseData = new ResponseData();
        responseData.localAuthorityCode = localAuthorityCode;

        spyOn(energyCalculationApiServiceStub, 'fetchEnergyCalculation').and.callThrough();
        spyOn(localAuthorityServiceStub, 'fetchLocalAuthorityDetails').and.callThrough();
        spyOn(recommendationsServiceStub, 'getAllRecommendations').and.callThrough();

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
                YourPlanFooterComponent,
                YourPlanSummaryComponent,
                StickyRowWrapperComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([]),
                InlineSVGModule,
                HttpClientTestingModule
            ],
            providers: [
                {provide: ResponseData, useValue: responseData},
                {provide: EnergyCalculationApiService, useValue: energyCalculationApiServiceStub},
                {provide: LocalAuthorityService, useValue: localAuthorityServiceStub},
                {provide: RecommendationsService, useValue: recommendationsServiceStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EnergyEfficiencyResultsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call energy calculation service with response data', () => {
        // when
        fixture.detectChanges();

        // then
        expect(energyCalculationApiServiceStub.fetchEnergyCalculation)
            .toHaveBeenCalledWith(new RdSapInput(responseData));
    });

    it('should display an error message if energy calculation service responds with an error', () => {
        // given
        energyCalculationResponse = ErrorObservable.create('some error text');

        // when
        fixture.detectChanges();

        // then
        expect(component.isLoading).toBeFalsy();
        expect(component.isError).toBeTruthy();
    });

    it('should call recommendations service', () => {
        // when
        fixture.detectChanges();

        // then
        expect(recommendationsServiceStub.getAllRecommendations).toHaveBeenCalled();
    });

    it('should display an error message if recommendations service responds with an error', () => {
        // given
        recommendationsResponse = ErrorObservable.create('some error text');

        // when
        fixture.detectChanges();

        // then
        expect(component.isLoading).toBeFalsy();
        expect(component.isError).toBeTruthy();
    });

    it('should initialise with the top-recommendations filter selected', () => {
        // when
        fixture.detectChanges();

        // then
        expect(component.activeTagFilters).toEqual(EnergyEfficiencyRecommendationTag.TopRecommendations);
    });

    it('should apply filters', () => {
        // given
        fixture.detectChanges();

        // when
        component.activeTagFilters = EnergyEfficiencyRecommendationTag.Grant;
        fixture.detectChanges();

        // then
        const recommendationElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(EnergyEfficiencyRecommendationCardComponent));
        const expectedNumberOfElements = recommendations.filter(rec => !!rec.grant).length;
        expect(recommendationElements.length).toEqual(expectedNumberOfElements);
    });

    it('should apply multiple filters additively', async(() => {
        // given
        fixture.detectChanges();

        // when
        component.activeTagFilters = EnergyEfficiencyRecommendationTag.QuickWin | EnergyEfficiencyRecommendationTag.LongerTerm;
        fixture.detectChanges();

        // then
        const recommendationElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(EnergyEfficiencyRecommendationCardComponent));
        expect(recommendationElements.length).toEqual(0);
    }));

    it('should display energy calculations correctly', () => {
        // when
        fixture.detectChanges();

        // then
        // match data in assets/test/energy-calculation-response.json
        expect(component.energyCalculations.currentEpcRating).toBe('F');
        expect(component.energyCalculations.currentEnergyBillPoundsPerYear).toBe(1226);
        // match annual savings from recommendations above
        expect(component.energyCalculations.potentialEnergyBillSavingPoundsPerYear).toBe(309);
    });

    it('should call local authority API service with code from response data', () => {
        // when
        fixture.detectChanges();

        // then
        expect(localAuthorityServiceStub.fetchLocalAuthorityDetails)
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

    function clearFilters(): void {
        component.activeTagFilters = EnergyEfficiencyRecommendationTag.None;
        fixture.detectChanges();
    }
});
