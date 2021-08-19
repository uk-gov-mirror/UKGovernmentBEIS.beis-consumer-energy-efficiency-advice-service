import {async, getTestBed, TestBed} from '@angular/core/testing';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {RecommendationsService} from './recommendations.service';
import {GrantEligibility} from '../../grants/grant-eligibility-service/grant-eligibility';
import {EnergyCalculationResponse} from '../energy-calculation-api-service/response/energy-calculation-response';
import {ResponseData} from '../response-data/response-data';
import {MeasureContent} from '../energy-saving-measure-content-service/measure-content';
import {EnergyCalculationApiService} from '../energy-calculation-api-service/energy-calculation-api-service';
import {EnergySavingMeasureContentService} from '../energy-saving-measure-content-service/energy-saving-measure-content.service';
import {GrantEligibilityService} from '../../grants/grant-eligibility-service/grant-eligibility.service';
import {EnergyEfficiencyRecommendationTag} from '../../energy-efficiency/energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag';
import {StandaloneNationalGrant} from '../../grants/model/standalone-national-grant';
import {NationalGrantForMeasure} from '../../grants/model/national-grant-for-measure';
import {TenureType} from "../../questionnaire/questions/tenure-type-question/tenure-type";
import {SessionService} from "../session-service/session.service";
import {EnergyEfficiencyRecommendations} from "./energy-efficiency-recommendations";

describe('RecommendationsService', () => {
    let injector: TestBed;
    let service: RecommendationsService;

    const dummyEnergyCalculations: EnergyCalculationResponse = require('assets/test/energy-calculation-response.json');
    let energyCalculationResponse: Observable<EnergyCalculationResponse>;
    const energyCalculationApiServiceStub = {
        fetchEnergyCalculation: () => energyCalculationResponse
    };

    const standaloneNationalGrants: StandaloneNationalGrant[] = [
        {
            grantId: 'national-grant-1',
            name: 'National Grant 1',
            description: 'some national grant',
            eligibility: GrantEligibility.MayBeEligible,
            annualPaymentPoundsStandalone: 120,
            advantages: [],
            steps: []
        },
        {
            grantId: 'national-grant-2',
            name: 'National Grant 2',
            description: 'another national grant',
            eligibility: GrantEligibility.MayBeEligible,
            annualPaymentPoundsStandalone: 120,
            advantages: [],
            steps: []
        }
    ];

    const nationalGrantForMeasure: NationalGrantForMeasure = {
        grantId: 'national-grant-for-measure',
        name: 'National Grant For Measure',
        description: 'some national grant for measure',
        eligibility: GrantEligibility.MayBeEligible,
        annualPaymentPoundsForMeasure: 120,
        steps: []
    };

    let standaloneNationalGrantsResponse: Observable<StandaloneNationalGrant[]>;
    let nationalGrantsForMeasureResponse: Observable<NationalGrantForMeasure[]>;
    const grantsEligibilityServiceStub = {
        getEligibleStandaloneGrants: () => standaloneNationalGrantsResponse,
        getEligibleGrantsForMeasure: () => nationalGrantsForMeasureResponse
    };

    const dummyMeasures = require('assets/test/measures-response.json');
    let measuresResponse: Observable<MeasureContent[]>;
    const measuresServiceStub = {
        fetchMeasureDetails: () => measuresResponse
    };

    let responseData: ResponseData;

    beforeEach(async(() => {
        measuresResponse = Observable.of(dummyMeasures);
        responseData = new ResponseData();
        responseData.tenureType = TenureType.OwnerOccupancy;
        standaloneNationalGrantsResponse = Observable.of(standaloneNationalGrants);
        nationalGrantsForMeasureResponse = Observable.of([nationalGrantForMeasure]);
        energyCalculationResponse = Observable.of(dummyEnergyCalculations);

        spyOn(grantsEligibilityServiceStub, 'getEligibleStandaloneGrants').and.callThrough();
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

    afterEach(() => {
        service.clearRecommendations();
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should use session recommendations when initialising new service', () => {
            // given
            const recommendations = require('assets/test/recommendation-session-data.json');
            sessionStorage.setItem('recommendations', JSON.stringify(recommendations));

            // when
            service.initialiseRecommendations();

            // then
            expect(service.getUserRecommendationsInPlan().length).toBe(1);
        });
    });

    describe('#getAllRecommendations', () => {
        it('should call measures content service', () => {
            // when
            service.getAllRecommendations(dummyEnergyCalculations);

            // then
            expect(measuresServiceStub.fetchMeasureDetails).toHaveBeenCalled();
        });

        it('should call grant eligibility service', () => {
            // when
            service.getAllRecommendations(dummyEnergyCalculations);

            // then
            expect(grantsEligibilityServiceStub.getEligibleStandaloneGrants).toHaveBeenCalled();
        });

        it('should include all home improvement measures with grant savings added on in user recommendations', async(() => {
            // given
            const expectedMeasures = Object.keys(dummyEnergyCalculations.measures)
                .map(measureCode => {
                    const costSavingFromGrant = nationalGrantForMeasure.annualPaymentPoundsForMeasure;
                    const costSavingFromMeasure = dummyEnergyCalculations.measures[measureCode].cost_saving || 0;
                    const costSaving = costSavingFromGrant + costSavingFromMeasure;
                    const energySaving = dummyEnergyCalculations.measures[measureCode].energy_saving;
                    return [costSaving, energySaving];
                });

            // when
            const recommendationsObservable = service.getAllRecommendations(dummyEnergyCalculations);

            // then
            recommendationsObservable.toPromise().then(recommendations => {
                const actualRecommendations = recommendations.userRecommendations
                    .map(rec => [rec.costSavingPoundsPerYear, rec.energySavingKwhPerYear]);
                expectedMeasures.forEach(measure => expect(actualRecommendations).toContain(measure));
            });
        }));

        it('should include all habit measures in user recommendations', async(() => {
            // given
            const expectedMeasures = Object.values(dummyEnergyCalculations.habit_measures)
                .map(measure => [measure.cost_saving, measure.energy_saving]);

            // when
            const recommendationsObservable = service.getAllRecommendations(dummyEnergyCalculations);

            // then
            recommendationsObservable.toPromise().then(recommendations => {
                const actualRecommendations = recommendations.userRecommendations
                    .map(rec => [rec.costSavingPoundsPerYear, rec.energySavingKwhPerYear]);
                expectedMeasures.forEach(measure => expect(actualRecommendations).toContain(measure));
            });
        }));

        it('should only include renter measures if renter in user recommendations', async(() => {
            // given
            responseData.tenureType = TenureType.PrivateTenancy;
            const expectedMeasures = Object.keys(dummyEnergyCalculations.measures_rented)
                .map(measureCode => {
                    const costSavingFromGrant = nationalGrantForMeasure.annualPaymentPoundsForMeasure;
                    const costSavingFromMeasure = dummyEnergyCalculations.measures[measureCode].cost_saving || 0;
                    const costSaving = costSavingFromGrant + costSavingFromMeasure;
                    const energySaving = dummyEnergyCalculations.measures[measureCode].energy_saving;
                    return [costSaving, energySaving];
                });

            // when
            const recommendationsObservable = service.getAllRecommendations(dummyEnergyCalculations);

            // then
            recommendationsObservable.toPromise().then(recommendations => {
                const actualRecommendations = recommendations.userRecommendations
                    .map(rec => [rec.costSavingPoundsPerYear, rec.energySavingKwhPerYear]);
                expectedMeasures.forEach(measure => expect(actualRecommendations).toContain(measure));
            });
        }));

        it('should include normal measures if renter in landlord recommendations', async(() => {
            // given
            responseData.tenureType = TenureType.PrivateTenancy;
            const expectedMeasures = Object.keys(dummyEnergyCalculations.measures)
                .map(measureCode => {
                    const costSavingFromGrant = nationalGrantForMeasure.annualPaymentPoundsForMeasure;
                    const costSavingFromMeasure = dummyEnergyCalculations.measures[measureCode].cost_saving || 0;
                    const costSaving = costSavingFromGrant + costSavingFromMeasure;
                    const energySaving = dummyEnergyCalculations.measures[measureCode].energy_saving;
                    return [costSaving, energySaving];
                });

            // when
            const recommendationsObservable = service.getAllRecommendations(dummyEnergyCalculations);

            // then
            recommendationsObservable.toPromise().then(recommendations => {
                const actualRecommendations = recommendations.landlordRecommendations
                    .map(rec => [rec.costSavingPoundsPerYear, rec.energySavingKwhPerYear]);
                expectedMeasures.forEach(measure => expect(actualRecommendations).toContain(measure));
            });
        }));

        it('should return recommendation details correctly', async(() => {
            // when
            const recommendationsObservable = service.getAllRecommendations(dummyEnergyCalculations);

            // then
            recommendationsObservable.toPromise().then((recommendations) => {
                // match data in assets/test/energy-calculation-response.json and assets/test/measures-response.json
                // for measure code U
                const userRecommendations = recommendations.userRecommendations;
                expect(userRecommendations[8].headline).toBe('Solar photovoltaic panels');
                expect(userRecommendations[8].readMoreRoute).toEqual('/measures/meta_solar_photovoltaic_panels');
                expect(userRecommendations[8].iconPath).toBe(EnergySavingMeasureContentService.measureIcons['U']);
                expect(userRecommendations[8].advantages).toEqual(['Green', 'Cost effective']);
                const expectedTags = [
                    EnergyEfficiencyRecommendationTag.LongerTerm,
                    EnergyEfficiencyRecommendationTag.Grant
                ];
                expect(userRecommendations[8].tags).toEqual(expectedTags);
                expect(userRecommendations[8].lifetimeYears).toEqual(30);
                expect(userRecommendations[8].installationCost.getEstimatedInvestment()).toEqual(750);
            });
        }));

        it('should sort user recommendations by interleaving the behavioural and grant measures within the BRE "main" measures',
            async(() => {
                // when
                const recommendationsObservable = service.getAllRecommendations(dummyEnergyCalculations);

                // then
                recommendationsObservable.toPromise().then((recommendations) => {
                    const userRecommendations = recommendations.userRecommendations;
                    // match data in assets/test/energy-calculation-response.json and assets/test/measures-response.json
                    expect(userRecommendations[0].headline).toBe('Cavity wall insulation');
                    expect(userRecommendations[1].headline).toBe('Lower thermostat by one degree');
                    expect(userRecommendations[2].headline).toBe('National Grant 1');
                    expect(userRecommendations[3].headline).toBe('Hot water cylinder insulation');
                    expect(userRecommendations[4].headline).toBe('National Grant 2');
                });
            }));

        it('should tag the top 5 recommendations as top-recommendations for user recommendations', async(() => {
            // when
            const recommendationsObservable = service.getAllRecommendations(dummyEnergyCalculations);

            // then
            recommendationsObservable.toPromise().then((recommendations) => {
                const userRecommendations = recommendations.userRecommendations;
                userRecommendations.filter((rec, index) => index < 5)
                    .forEach(rec => expect(rec.tags.includes(EnergyEfficiencyRecommendationTag.TopRecommendations)).toBeTruthy());
                userRecommendations.filter((rec, index) => index >= 5)
                    .forEach(rec => expect(rec.tags.includes(EnergyEfficiencyRecommendationTag.TopRecommendations)).toBeFalsy());
            });
        }));

        it('should link recommendation to available grant for user recommendations', async(() => {
            // when
            const recommendationsObservable = service.getAllRecommendations(dummyEnergyCalculations);

            // then
            recommendationsObservable.toPromise().then((recommendations) => {
                const cavityWallInsulationRecommendation = recommendations
                    .userRecommendations
                    .find(rec => rec.headline === 'Cavity wall insulation');
                expect(cavityWallInsulationRecommendation.grant.name).toBe('National Grant For Measure');
            });
        }));

        it('should save recommendations to session', async(() => {
            // when
            const recommendationsObservable = service.getAllRecommendations(dummyEnergyCalculations);

            // then
            recommendationsObservable.toPromise().then((recommendations) => {

                const sessionRecommendations: EnergyEfficiencyRecommendations =
                    SessionService.getFromSession('recommendations');

                // test data in assets/test/energy-calculation-response.json and assets/test/measures-response.json
                expect(sessionRecommendations.userRecommendations
                    .some(measure => measure.headline === 'Lower thermostat by one degree')).toBeTruthy();
                expect(sessionRecommendations.userRecommendations
                    .some(measure => measure.headline === 'Cavity wall insulation')).toBeTruthy();
            });
        }));
    });
});
