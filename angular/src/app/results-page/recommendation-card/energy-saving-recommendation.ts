import {EnergySavingMeasureResponse} from '../../common/energy-calculation-api-service/response/energy-saving-measure-response';
import {RecommendationType, RecommendationTypeService} from './recommendation-type.service';

export class EnergySavingRecommendation {
    recommendationType: RecommendationType;
    costSavingPoundsPerYear: number;
    energySavingKwhPerYear: number;

    constructor(
        recommendationTypeCode: string,
        energySavingMeasureResponse: EnergySavingMeasureResponse
    ) {
        this.recommendationType = RecommendationTypeService.recommendationTypes[recommendationTypeCode];
        this.costSavingPoundsPerYear = energySavingMeasureResponse.cost_saving;
        this.energySavingKwhPerYear = energySavingMeasureResponse.energy_saving;
    }
}