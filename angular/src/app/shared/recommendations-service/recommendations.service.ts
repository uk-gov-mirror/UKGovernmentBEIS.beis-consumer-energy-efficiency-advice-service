import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import isEqual from 'lodash-es/isEqual';
import clone from 'lodash-es/clone';
import concat from 'lodash-es/concat';
import orderBy from 'lodash-es/orderBy';
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
import {EnergyEfficiencyRecommendationTag} from
    '../../energy-efficiency/energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag';
import {EnergySavingMeasureResponse} from '../energy-calculation-api-service/response/energy-saving-measure-response';
import {HabitMeasureResponse} from '../energy-calculation-api-service/response/habit-measure-response';

@Injectable()
export class RecommendationsService {

    cachedCurrentScore: number;

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

    get potentialScore(): number {
        return this.cachedCurrentScore + this.getRecommendationsInPlan().length;
    }

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
                    const habitRecommendations = RecommendationsService
                        .getHabitRecommendationsContent(energyCalculation.habit_measures, measuresContent);
                    const grantRecommendations = eligibleStandaloneGrants
                        .map(grant => EnergyEfficiencyRecommendation.fromNationalGrant(grant, 'icon-grant'));
                    return this.getHomeImprovementRecommendationsContent(energyCalculation.measures, measuresContent)
                        .map(homeImprovementRecommendations => {
                            const allRecommendations = concat(homeImprovementRecommendations, habitRecommendations, grantRecommendations);
                            const orderedRecommendations = orderBy(allRecommendations, ['costSavingPoundsPerYear'], ['desc']);
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
                            measureContent,
                            EnergySavingMeasureContentService.measureIcons[measureCode],
                            grantsForMeasure
                        );
                    });
            })
            .filter(measure => measure));
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
}
