import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import isEqual from 'lodash-es/isEqual';
import clone from 'lodash-es/clone';
import keys from 'lodash-es/keys';
import 'rxjs/add/operator/do';
import {ResponseData} from '../response-data/response-data';
import {EnergySavingMeasureContentService} from '../energy-saving-measure-content-service/energy-saving-measure-content.service';
import {GrantEligibilityService} from '../../grants/grant-eligibility-service/grant-eligibility.service';
import {EnergyEfficiencyRecommendation} from './energy-efficiency-recommendation';
import {MeasuresResponse} from '../energy-calculation-api-service/response/measures-response';
import {MeasureContent} from '../energy-saving-measure-content-service/measure-content';
import {EnergyEfficiencyRecommendationTag, hasTag} from '../../energy-efficiency/energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag';
import {EnergySavingMeasureResponse} from '../energy-calculation-api-service/response/energy-saving-measure-response';
import {HabitMeasureResponse} from '../energy-calculation-api-service/response/habit-measure-response';
import {EnergyCalculationResponse} from "../energy-calculation-api-service/response/energy-calculation-response";
import {TenureType} from "../../questionnaire/questions/tenure-type-question/tenure-type";
import {UserJourneyType} from "../response-data/user-journey-type";
import {FullMeasuresResponse} from "../energy-calculation-api-service/response/full-measures-response";
import {EnergyEfficiencyRecommendations} from "./energy-efficiency-recommendations";
import {GreenHomesGrantRecommendation, GreenHomesGrantRecommendationsService} from "./green-homes-grant-recommendations.service";

@Injectable()
export class RecommendationsService {

    private static TOP_RECOMMENDATIONS: number = 5;
    private static DEFAULT_RECOMMENDATIONS: EnergyEfficiencyRecommendations = new EnergyEfficiencyRecommendations();

    private cachedResponseData: ResponseData;
    private cachedRecommendations: EnergyEfficiencyRecommendations = new EnergyEfficiencyRecommendations();

    constructor(private responseData: ResponseData,
                private measureService: EnergySavingMeasureContentService,
                private grantsEligibilityService: GrantEligibilityService,
                private greenHomesGrantRecommendationsService: GreenHomesGrantRecommendationsService) {
    }

    getAllRecommendations(energyCalculation: EnergyCalculationResponse): Observable<EnergyEfficiencyRecommendations> {
        if (!isEqual(this.responseData, this.cachedResponseData) || !this.cachedRecommendations.hasRecommendations()) {
            this.cachedResponseData = clone(this.responseData);
            return this.refreshAllRecommendations(energyCalculation)
                .do(recommendations => this.cachedRecommendations = recommendations)
                .catch(() => {
                    return Observable.of(RecommendationsService.DEFAULT_RECOMMENDATIONS);
                });
        }
        return Observable.of(this.cachedRecommendations);
    }

    getRecommendationsInPlan(): EnergyEfficiencyRecommendation[] {
        return this.cachedRecommendations.getAll()
            .filter(recommendation => recommendation.isAddedToPlan);
    }

    getUserRecommendationsInPlan(): EnergyEfficiencyRecommendation[] {
        return this.cachedRecommendations.userRecommendations
            .filter(recommendation => recommendation.isAddedToPlan);
    }

    getLandlordRecommendationsInPlan(): EnergyEfficiencyRecommendation[] {
        return this.cachedRecommendations.landlordRecommendations
            .filter(recommendation => recommendation.isAddedToPlan);
    }

    private refreshAllRecommendations(energyCalculation: EnergyCalculationResponse): Observable<EnergyEfficiencyRecommendations> {
        return Observable.forkJoin(
            this.measureService.fetchMeasureDetails(),
            this.grantsEligibilityService.getEligibleStandaloneGrants(),
            this.greenHomesGrantRecommendationsService.getGreenHomesGrantRecommendations()
        )
            .mergeMap(
                ([measuresContent, eligibleStandaloneGrants, greenHomesGrantRecommendations]) => {
                    if (!energyCalculation) {
                        throw new Error('Received empty energy calculation response');
                    }
                    const habitRecommendations = this
                        .getFilteredHabitRecommendationsContent(energyCalculation.habit_measures, measuresContent);
                    const grantRecommendations = eligibleStandaloneGrants
                        .map(grant => EnergyEfficiencyRecommendation.fromNationalGrant(grant));
                    return this.getAllRecommendationsContent(
                        this.getFullMeasuresFromEnergyCalculation(energyCalculation, greenHomesGrantRecommendations),
                        measuresContent,
                        habitRecommendations,
                        grantRecommendations
                    );
                }
            );
    }

    private getAllRecommendationsContent(fullMeasures: FullMeasuresResponse<EnergySavingMeasureResponse>,
                                         measuresContent: MeasureContent[],
                                         habitRecommendations: EnergyEfficiencyRecommendation[],
                                         grantRecommendations: EnergyEfficiencyRecommendation[]
    ): Observable<EnergyEfficiencyRecommendations> {
        return Observable.forkJoin(
            this.getUserRecommendationsContent(fullMeasures.userMeasures, measuresContent, habitRecommendations, grantRecommendations),
            this.getLandlordRecommendationsContent(fullMeasures.landlordMeasures, measuresContent)
        )
            .mergeMap(
                ([userRecommendations, landlordRecommendations]) => {
                    return Observable.of(new EnergyEfficiencyRecommendations(userRecommendations, landlordRecommendations));
                }
            );
    }

    private getUserRecommendationsContent(measures: MeasuresResponse<EnergySavingMeasureResponse>,
                                      measuresContent: MeasureContent[],
                                      habitRecommendations: EnergyEfficiencyRecommendation[],
                                      grantRecommendations: EnergyEfficiencyRecommendation[]
    ): Observable<EnergyEfficiencyRecommendation[]> {
        return this.getRecommendationsContent(measures, measuresContent)
            .map(homeImprovementRecommendations => {
                const allRecommendations = [homeImprovementRecommendations, habitRecommendations, grantRecommendations];
                const orderedRecommendations = RecommendationsService.orderRecommendations(allRecommendations);
                RecommendationsService.tagTopRecommendations(orderedRecommendations);
                return orderedRecommendations;
            });
    }

    private getLandlordRecommendationsContent(measures: MeasuresResponse<EnergySavingMeasureResponse>,
                                      measuresContent: MeasureContent[]
    ): Observable<EnergyEfficiencyRecommendation[]> {
        return this.getRecommendationsContent(measures, measuresContent)
            .map(homeImprovementRecommendations => {
                const allRecommendations = [homeImprovementRecommendations];
                return RecommendationsService.orderRecommendations(allRecommendations);
            });
    }

    /**
     * Keep this in sync with EnergySavingPlanController.java `loadDisplayData`
     */
    private getRecommendationsContent(measures: MeasuresResponse<EnergySavingMeasureResponse>,
                                      measuresContent: MeasureContent[]
    ): Observable<EnergyEfficiencyRecommendation[]> {
        if (!keys(measures).length) {
            return Observable.of([]);
        }
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
            .filter(measure => measure)
        );
    }

    private getFullMeasuresFromEnergyCalculation(
        energyCalculation: EnergyCalculationResponse,
        greenHomesGrantRecommendations: GreenHomesGrantRecommendation[]
    ): FullMeasuresResponse<EnergySavingMeasureResponse> {
        const userMeasures = this.getMeasuresFromEnergyCalculation(energyCalculation);
        const landlordMeasures = this.getLandlordMeasuresFromEnergyCalculation(energyCalculation);
        const ownerMeasures = this.isRentalUser() ? landlordMeasures : userMeasures;
        for (const recommendation of greenHomesGrantRecommendations) {
            if (ownerMeasures[recommendation.code] !== undefined) {
                // This measure is already being recommended.
                continue;
            }
            ownerMeasures[recommendation.code] = recommendation.response;
        }
        return {
            userMeasures: userMeasures,
            landlordMeasures: landlordMeasures
        };
    }

    private getMeasuresFromEnergyCalculation(energyCalculation: EnergyCalculationResponse): MeasuresResponse<EnergySavingMeasureResponse> {
        if (this.isRentalUser()) {
            return energyCalculation.measures_rented || energyCalculation.default_rental_measures || {};
        }
        return energyCalculation.measures;
    }

    private getLandlordMeasuresFromEnergyCalculation(
        energyCalculation: EnergyCalculationResponse
    ): MeasuresResponse<EnergySavingMeasureResponse> {
        return this.isRentalUser()
            ? energyCalculation.measures || {}
            : {};
    }

    private isRentalUser() {
        return this.responseData.tenureType !== TenureType.OwnerOccupancy && !!this.responseData.tenureType;
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

    // The entries in "recommendationArrays" are arrays of recommendations from different sources.
    // We first group these arrays by their Green Homes Grant eligibility before interleaving them.
    private static orderRecommendations(recommendationArrays:
        (EnergyEfficiencyRecommendation[])[]): EnergyEfficiencyRecommendation[] {
        const groupedArrays: ({
            ghgPrimary: EnergyEfficiencyRecommendation[],
            ghgSecondary: EnergyEfficiencyRecommendation[],
            ghgNotEligible: EnergyEfficiencyRecommendation[]
        })[] = recommendationArrays.map(array => {
            const ghgGroups = { ghgPrimary: [], ghgSecondary: [], ghgNotEligible: [] };
            array.forEach(recommendation => {
                if (hasTag(recommendation, EnergyEfficiencyRecommendationTag.GHGPrimary)) {
                    ghgGroups.ghgPrimary.push(recommendation);
                } else if (hasTag(recommendation, EnergyEfficiencyRecommendationTag.GHGSecondary)) {
                    ghgGroups.ghgSecondary.push(recommendation);
                } else {
                    ghgGroups.ghgNotEligible.push(recommendation);
                }
            });
            return ghgGroups;
        });
        const ghgPrimaryRecommendationArrays = groupedArrays.map(g => g.ghgPrimary);
        const ghgSecondaryRecommendationArrays = groupedArrays.map(g => g.ghgSecondary);
        const ghgNotEligibleRecommendationArrays = groupedArrays.map(g => g.ghgNotEligible);
        return this.interleaveRecommendations(ghgPrimaryRecommendationArrays)
            .concat(this.interleaveRecommendations(ghgSecondaryRecommendationArrays))
            .concat(this.interleaveRecommendations(ghgNotEligibleRecommendationArrays));
    }

    // The entries in "recommendationArrays" are arrays of recommendations from different sources.
    // We interleave them into a single list, taking one from each array in turn until they are exhausted.
    private static interleaveRecommendations(recommendationArrays:
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
