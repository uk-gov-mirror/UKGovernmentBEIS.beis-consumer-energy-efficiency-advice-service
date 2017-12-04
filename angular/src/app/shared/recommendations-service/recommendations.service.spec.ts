import {getTestBed, TestBed, async} from "@angular/core/testing";
import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs/Observable";
import {RecommendationsService} from "./recommendations.service";
import {NationalGrantViewModel} from "../../grants/model/national-grant-view-model";
import {GrantEligibility} from "../../grants/grant-eligibility-service/grant-eligibility";
import {EnergyCalculationResponse} from "../energy-calculation-api-service/response/energy-calculation-response";
import {ResponseData} from "../response-data/response-data";
import {GrantViewModel} from "../../grants/model/grant-view-model";
import {MeasureContent} from "../energy-saving-measure-content-service/measure-content";
import {EnergyCalculationApiService} from "../energy-calculation-api-service/energy-calculation-api-service";
import {EnergySavingMeasureContentService} from "../energy-saving-measure-content-service/energy-saving-measure-content.service";
import {GrantEligibilityService} from "../../grants/grant-eligibility-service/grant-eligibility.service";
import {RdSapInput} from "../energy-calculation-api-service/request/rdsap-input";
import {EnergyEfficiencyRecommendationTag} from "../../energy-efficiency/energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag";

describe('RecommendationsService', () => {
    let injector: TestBed;
    let service: RecommendationsService;

    const dummyEnergyCalculations = require('assets/test/energy-calculation-response.json');
    let energyCalculationResponse: Observable<EnergyCalculationResponse>;
    let energyCalculationApiServiceStub = {
        fetchEnergyCalculation: () => energyCalculationResponse
    };

    const nationalGrants: NationalGrantViewModel[] = [
        {
            grantId: 'national-grant-1',
            name: 'National Grant 1',
            description: 'some national grant',
            eligibility: GrantEligibility.MayBeEligible,
            shouldDisplayWithoutMeasures: true,
            annualPaymentPounds: 120,
            linkedMeasureCodes: ['U'],
            advantages: [],
            steps: []
        },
        {
            grantId: 'national-grant-2',
            name: 'National Grant 2',
            description: 'another national grant',
            eligibility: GrantEligibility.MayBeEligible,
            shouldDisplayWithoutMeasures: true,
            annualPaymentPounds: 120,
            linkedMeasureCodes: [],
            advantages: [],
            steps: []
        }
    ];

    let grantsResponse: Observable<GrantViewModel[]>;
    const grantsEligibilityServiceStub = {
        getApplicableGrants: () => grantsResponse
    };

    const dummyMeasures = require('assets/test/measures-response.json');
    let measuresResponse: Observable<MeasureContent[]>;
    let measuresServiceStub = {
        fetchMeasureDetails: () => measuresResponse
    };

    let responseData: ResponseData;

    beforeEach(async(() => {
        measuresResponse = Observable.of(dummyMeasures);
        responseData = new ResponseData();
        grantsResponse = Observable.of(nationalGrants);
        energyCalculationResponse = Observable.of(dummyEnergyCalculations);

        spyOn(grantsEligibilityServiceStub, 'getApplicableGrants').and.callThrough();
        spyOn(energyCalculationApiServiceStub, 'fetchEnergyCalculation').and.callThrough();
        spyOn(measuresServiceStub, 'fetchMeasureDetails').and.callThrough();

        TestBed.configureTestingModule({
            providers: [
                RecommendationsService,
                {provide: ResponseData, useValue: responseData},
                {provide: EnergyCalculationApiService, useValue: energyCalculationApiServiceStub},
                {provide: EnergySavingMeasureContentService, useValue: measuresServiceStub},
                {provide: GrantEligibilityService, useValue: grantsEligibilityServiceStub}
            ]
        });
    }));

    beforeEach(() => {
        injector = getTestBed();
        service = injector.get(RecommendationsService);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#getAllRecommendations', () => {
        it('should call energy calculation API service with response data', () => {
            // when
            service.getAllRecommendations();

            // then
            expect(energyCalculationApiServiceStub.fetchEnergyCalculation)
                .toHaveBeenCalledWith(new RdSapInput(responseData));
        });

        it('should call measures content service', () => {
            // when
            service.getAllRecommendations();

            // then
            expect(measuresServiceStub.fetchMeasureDetails).toHaveBeenCalled();
        });

        it('should call grant eligibility service', () => {
            // when
            service.getAllRecommendations();

            // then
            expect(grantsEligibilityServiceStub.getApplicableGrants).toHaveBeenCalled();
        });

        it('should include all home improvement measures in response', async(() => {
            // given
            const expectedMeasures = Object.values(dummyEnergyCalculations.measures)
                .map(measure => [measure.cost_saving, measure.energy_saving]);

            // when
            const recommendations = service.getAllRecommendations();

            // then
            recommendations.toPromise().then(recommendations => {
                const actualRecommendations = recommendations
                    .map(rec => [rec.costSavingPoundsPerYear, rec.energySavingKwhPerYear]);
                expectedMeasures.forEach(measure => expect(actualRecommendations).toContain(measure));
            });
        }));

        it('should include all habit measures in response', async(() => {
            // given
            const expectedMeasures = Object.values(dummyEnergyCalculations.habit_measures)
                .map(measure => [measure.cost_saving, measure.energy_saving]);

            // when
            const recommendations = service.getAllRecommendations();

            // then
            recommendations.toPromise().then(recommendations => {
                const actualRecommendations = recommendations
                    .map(rec => [rec.costSavingPoundsPerYear, rec.energySavingKwhPerYear]);
                expectedMeasures.forEach(measure => expect(actualRecommendations).toContain(measure));
            });
        }));

        it('should return recommendation details correctly', async(() => {
            // when
            const recommendations = service.getAllRecommendations();

            // then
            recommendations.toPromise().then((recommendations) => {
                // match data in assets/test/energy-calculation-response.json and assets/test/measures-response.json
                // for measure code U
                expect(recommendations[0].headline).toBe('Solar photovoltaic panels');
                expect(recommendations[0].readMoreRoute).toContain('home-improvements/solar-photovoltaic-panels');
                expect(recommendations[0].iconClassName).toBe(EnergySavingMeasureContentService.measureIcons['U']);
                expect(recommendations[0].advantages).toEqual(['Green', 'Cost effective']);
                const expectedTags = EnergyEfficiencyRecommendationTag.LongerTerm |
                    EnergyEfficiencyRecommendationTag.Grant | EnergyEfficiencyRecommendationTag.TopRecommendations;
                expect(recommendations[0].tags).toEqual(expectedTags);
            });
        }));

        it('should sort recommendations by cost saving descending', async(() => {
            // when
            const recommendations = service.getAllRecommendations();

            // then
            recommendations.toPromise().then((recommendations) => {
                expect(recommendations[0].costSavingPoundsPerYear).toBe(230.64);
                expect(recommendations[0].energySavingKwhPerYear).toBe(0);
            });
        }));

        it('should tag the top 5 recommendations as top-recommendations', async(() => {
            // when
            const recommendations = service.getAllRecommendations();

            // then
            recommendations.toPromise().then((recommendations) => {
                recommendations.filter((rec, index) => index < 5)
                    .forEach(rec => expect(rec.tags & EnergyEfficiencyRecommendationTag.TopRecommendations).toBeTruthy());
                recommendations.filter((rec, index) => index >= 5)
                    .forEach(rec => expect(rec.tags & EnergyEfficiencyRecommendationTag.TopRecommendations).toBeFalsy());
            });
        }));

        it('should link recommendation to available grant', async(() => {
            // when
            const recommendations = service.getAllRecommendations();

            // then
            recommendations.toPromise().then((recommendations) => {
                // match data in assets/test/energy-calculation-response.json and assets/test/measures-response.json
                // for measure code U
                expect(recommendations[0].grant.name).toBe('National Grant 1');
            });
        }));
    });
});