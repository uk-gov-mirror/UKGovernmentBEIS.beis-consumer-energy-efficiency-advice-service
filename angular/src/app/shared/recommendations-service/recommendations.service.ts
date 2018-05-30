import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import isEqual from 'lodash-es/isEqual';
import clone from 'lodash-es/clone';
import keys from 'lodash-es/keys';
import 'rxjs/add/operator/do';
import {ResponseData} from '../response-data/response-data';
import {EnergyCalculationApiService} from '../energy-calculation-api-service/energy-calculation-api-service';
import {EnergySavingMeasureContentService} from '../energy-saving-measure-content-service/energy-saving-measure-content.service';
import {GrantEligibilityService} from '../../grants/grant-eligibility-service/grant-eligibility.service';
import {EnergyEfficiencyRecommendation} from './energy-efficiency-recommendation';
import {RdSapInput} from '../energy-calculation-api-service/request/rdsap-input';
import {MeasuresResponse} from '../energy-calculation-api-service/response/measures-response';
import {MeasureContent} from '../energy-saving-measure-content-service/measure-content';
import {EnergyEfficiencyRecommendationTag} from '../../energy-efficiency/energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag';
import {EnergySavingMeasureResponse} from '../energy-calculation-api-service/response/energy-saving-measure-response';
import {HabitMeasureResponse} from '../energy-calculation-api-service/response/habit-measure-response';
import {EnergyCalculationResponse} from "../energy-calculation-api-service/response/energy-calculation-response";
import {TenureType} from "../../questionnaire/questions/tenure-type-question/tenure-type";
import {UserJourneyType} from "../response-data/user-journey-type";

@Injectable()
export class RecommendationsService {

    cachedCurrentScore: number;
    potentialScore: number;
    potentialScoreLoading: boolean;

    private static TOP_RECOMMENDATIONS: number = 5;

    private cachedResponseData: ResponseData;
    private cachedRecommendations: EnergyEfficiencyRecommendation[] = [];

    constructor(private responseData: ResponseData,
                private energyCalculationApiService: EnergyCalculationApiService,
                private measureService: EnergySavingMeasureContentService,
                private grantsEligibilityService: GrantEligibilityService) {
    }

    getAllRecommendations(): Observable<EnergyEfficiencyRecommendation[]> {
        if (!isEqual(this.responseData, this.cachedResponseData) || this.cachedRecommendations.length === 0) {
            this.cachedResponseData = clone(this.responseData);
            return this.refreshAllRecommendations()
                .do(recommendations => this.cachedRecommendations = recommendations);
        }
        return Observable.of(this.cachedRecommendations);
    }

    getRecommendationsInPlan(): EnergyEfficiencyRecommendation[] {
        return this.cachedRecommendations
            .filter(recommendation => recommendation.isAddedToPlan);
    }

    refreshPotentialScore() {
        const measureCodes = this.getRecommendationsInPlan()
            .map(r => r.measureCode)
            .filter(m => m);
        if (measureCodes.length === 0) {
            this.potentialScore = this.cachedCurrentScore;
            return;
        }

        this.potentialScoreLoading = true;
        this.energyCalculationApiService
            .fetchEnergyCalculation(new RdSapInput(this.responseData, measureCodes))
            .finally(() => this.potentialScoreLoading = false)
            .subscribe(energyCalculation => this.potentialScore = parseInt(energyCalculation['Potential-SAP-Rating']));
    }

    /**
     * Keep this in sync with EnergySavingPlanController.java `loadDisplayData`
     */
    private refreshAllRecommendations(): Observable<EnergyEfficiencyRecommendation[]> {
        return Observable.forkJoin(
            this.energyCalculationApiService.fetchEnergyCalculation(new RdSapInput(this.responseData)),
            this.measureService.fetchMeasureDetails(),
            this.grantsEligibilityService.getEligibleStandaloneGrants()
        )
            .mergeMap(
                ([energyCalculation, measuresContent, eligibleStandaloneGrants]) => {
                    if (!energyCalculation) {
                        throw new Error('Received empty energy calculation response');
                    }
                    this.cachedCurrentScore = parseInt(energyCalculation['Current-SAP-Rating']);
                    this.potentialScore = this.cachedCurrentScore;
                    const habitRecommendations = this
                        .getFilteredHabitRecommendationsContent(energyCalculation.habit_measures, measuresContent);
                    const grantRecommendations = eligibleStandaloneGrants
                        .map(grant => EnergyEfficiencyRecommendation.fromNationalGrant(grant));
                    return this.getHomeImprovementRecommendationsContent(
                        this.getMeasuresFromEnergyCalculation(energyCalculation),
                        measuresContent
                    )
                        .map(homeImprovementRecommendations => {
                            const allRecommendations = [homeImprovementRecommendations, habitRecommendations, grantRecommendations];
                            const orderedRecommendations = RecommendationsService.orderRecommendations(allRecommendations);
                            RecommendationsService.tagTopRecommendations(orderedRecommendations);
                            return orderedRecommendations;
                        });
                }
            );
    }

    private getHomeImprovementRecommendationsContent(measures: MeasuresResponse<EnergySavingMeasureResponse>,
                                                     measuresContent: MeasureContent[]): Observable<EnergyEfficiencyRecommendation[]> {
        return Observable.forkJoin(keys(measures)
            .map(measureCode => {
                const measureContent: MeasureContent = measuresContent
                    .find((recommendationTypeDetail) => recommendationTypeDetail.acf.measure_code === measureCode);
                if (!measureContent) {
                    console.error(`Recommendation with code ${ measureCode } not recognised`);
                    return null;
                }
                return this.grantsEligibilityService
                    .getEligibleGrantsForMeasure(measureCode, measures[measureCode])
                    .map(grantsForMeasure => {
                        return EnergyEfficiencyRecommendation.fromMeasure(
                            measures[measureCode],
                            measureCode,
                            measureContent,
                            EnergySavingMeasureContentService.measureIcons[measureCode],
                            grantsForMeasure
                        );
                    });
            })
            .filter(measure => measure));
    }

    private getMeasuresFromEnergyCalculation(energyCalculation: EnergyCalculationResponse): MeasuresResponse<EnergySavingMeasureResponse> {
        if (this.responseData.tenureType !== TenureType.OwnerOccupancy
            && !!this.responseData.tenureType
            && energyCalculation.measures_rented
        ) {
            return energyCalculation.measures_rented;
        }
        return energyCalculation.measures;
    }

    private getFilteredHabitRecommendationsContent(measures: MeasuresResponse<HabitMeasureResponse>,
                                                   measuresContent: MeasureContent[]): EnergyEfficiencyRecommendation[] {
        if (this.responseData.userJourneyType === UserJourneyType.PlanHomeImprovements) {
            return [];
        }
        const habitRecommendations = RecommendationsService.getHabitRecommendationsContent(measures, measuresContent);
        if (this.responseData.userJourneyType === UserJourneyType.MakeHomeWarmer) {
            return habitRecommendations.filter(
                recommendation => recommendation.recommendationID !== `meta_one_degree_reduction`);
        }
        return habitRecommendations;
    }

    private static getHabitRecommendationsContent(measures: MeasuresResponse<HabitMeasureResponse>,
                                                  measuresContent: MeasureContent[]): EnergyEfficiencyRecommendation[] {
        return keys(measures)
            .map(measureCode => {
                const recommendationMetadata: MeasureContent = measuresContent
                    .find((recommendationTypeDetail) => recommendationTypeDetail.acf.measure_code === measureCode);
                if (!recommendationMetadata) {
                    console.error(`Recommendation with code ${ measureCode } not recognised`);
                    return null;
                }
                const iconPath = EnergySavingMeasureContentService.measureIcons[measureCode] ||
                    EnergySavingMeasureContentService.FALLBACK_MEASURE_ICON;
                return EnergyEfficiencyRecommendation.fromMeasure(
                    measures[measureCode],
                    measureCode,
                    recommendationMetadata,
                    iconPath,
                    null
                );
            })
            .filter(measure => measure);
    }

    private static tagTopRecommendations(recommendations: EnergyEfficiencyRecommendation[]): void {
        recommendations
            .slice(0, RecommendationsService.TOP_RECOMMENDATIONS)
            .forEach(recommendation => recommendation.tags |= EnergyEfficiencyRecommendationTag.TopRecommendations);
    }

    // The entries in "recommendationArrays" are arrays of recommendations from different sources
    // We interleave them into a single list, taking one from each array in turn until they are exhausted
    private static orderRecommendations(recommendationArrays:
        (EnergyEfficiencyRecommendation[])[]): EnergyEfficiencyRecommendation[] {
        const maxLength = RecommendationsService.getMaxLengthOfRecommendationArrays(recommendationArrays);
        const orderedRecommendations = [];
        for (let i = 0; i < maxLength; i++) {
            recommendationArrays.forEach(recommendationArray => {
                if (i < recommendationArray.length) {
                    orderedRecommendations.push(recommendationArray[i]);
                }
            });
        }
        return orderedRecommendations;
    }

    private static getMaxLengthOfRecommendationArrays(recommendationArrays) {
        return recommendationArrays.map(a => a.length).reduce((x, y) => Math.max(x, y), 0);
    }
}
