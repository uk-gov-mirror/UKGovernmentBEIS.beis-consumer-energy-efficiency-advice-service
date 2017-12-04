import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import isEqual from "lodash-es/isEqual";
import clone from "lodash-es/clone";
import concat from "lodash-es/concat";
import orderBy from "lodash-es/orderBy";
import keys from "lodash-es/keys";
import {ResponseData} from "../response-data/response-data";
import {RecommendationOption} from "./recommendation-option";
import {EnergyCalculationApiService} from "../energy-calculation-api-service/energy-calculation-api-service";
import {EnergySavingMeasureContentService} from "../energy-saving-measure-content-service/energy-saving-measure-content.service";
import {GrantEligibilityService} from "../../grants/grant-eligibility-service/grant-eligibility.service";
import {EnergyEfficiencyRecommendation} from "./energy-efficiency-recommendation";
import {RdSapInput} from "../energy-calculation-api-service/request/rdsap-input";
import {MeasuresResponse} from "../energy-calculation-api-service/response/measures-response";
import {MeasureContent} from "../energy-saving-measure-content-service/measure-content";
import {EnergyEfficiencyRecommendationTag} from "../../energy-efficiency/energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag";
import {EnergySavingMeasureResponse} from "../energy-calculation-api-service/response/energy-saving-measure-response";
import {HabitMeasureResponse} from "../energy-calculation-api-service/response/habit-measure-response";

@Injectable()
export class RecommendationsService {

    private static TOP_RECOMMENDATIONS: number = 5;

    private cachedResponseData: ResponseData;
    private cachedAllRecommendations: RecommendationOption[] = [];

    constructor(private responseData: ResponseData,
                private energyCalculationApiService: EnergyCalculationApiService,
                private measureService: EnergySavingMeasureContentService,
                private grantsEligibilityService: GrantEligibilityService) {
    }

    getAllRecommendations(): Observable<EnergyEfficiencyRecommendation[]> {
        if (!isEqual(this.responseData, this.cachedResponseData) || this.cachedAllRecommendations.length === 0) {
            this.cachedResponseData = clone(this.responseData);
            return this.refreshAllRecommendations()
                .map(recommendations => {
                    this.cachedAllRecommendations = recommendations.map(rec => {
                        return {
                            value: rec,
                            isAddedToPlan: false
                        };
                    });
                    return recommendations;
                })
        }
        return Observable.of(this.cachedAllRecommendations.map(rec => rec.value));
    }

    getRecommendationsInPlan(): EnergyEfficiencyRecommendation[] {
        return this.cachedAllRecommendations
            .filter(recommendationOption => recommendationOption.isAddedToPlan)
            .map(recommendationOption => recommendationOption.value);
    }

    toggleAddedToPlan(recommendation: EnergyEfficiencyRecommendation): void {
        const recommendationIndex = this.cachedAllRecommendations
            .findIndex(recommendationOption => isEqual(recommendationOption.value, recommendation));
        this.cachedAllRecommendations[recommendationIndex].isAddedToPlan =
            !this.cachedAllRecommendations[recommendationIndex].isAddedToPlan;
    }

    isAddedToPlan(recommendation: EnergyEfficiencyRecommendation): boolean {
        return this.cachedAllRecommendations
            .find(recommendationOption => isEqual(recommendationOption.value, recommendation))
            .isAddedToPlan;
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
                    const habitRecommendations = RecommendationsService
                        .getHabitRecommendationsContent(energyCalculation.habit_measures, measuresContent);
                    const grantRecommendations = eligibleStandaloneGrants
                        .map(grant => EnergyEfficiencyRecommendation.fromNationalGrant(grant, 'icon-grant'));
                    return this.getHomeImprovementRecommendationsContent(energyCalculation.measures, measuresContent)
                        .map(homeImprovementRecommendations => {
                            const allRecommendations = concat(homeImprovementRecommendations, habitRecommendations, grantRecommendations);
                            const orderedRecommendations = orderBy(allRecommendations, ['costSavingPoundsPerYear'], ['desc']);
                            return RecommendationsService.tagTopRecommendations(orderedRecommendations);
                        });
                }
            )
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
                            measureCode,
                            measures[measureCode],
                            measureContent,
                            EnergySavingMeasureContentService.measureIcons[measureCode],
                            grantsForMeasure
                        )
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
                return EnergyEfficiencyRecommendation.fromMeasure(
                    measureCode,
                    measures[measureCode],
                    recommendationMetadata,
                    EnergySavingMeasureContentService.measureIcons[measureCode],
                    null
                )
            })
            .filter(measure => measure);
    }

    private static tagTopRecommendations(recommendations: EnergyEfficiencyRecommendation[]): EnergyEfficiencyRecommendation[] {
        return recommendations
            .map((recommendation: EnergyEfficiencyRecommendation, index: number) => {
                if (index < RecommendationsService.TOP_RECOMMENDATIONS) {
                    recommendation.tags |= EnergyEfficiencyRecommendationTag.TopRecommendations;
                }
                return recommendation;
            });
    }
}