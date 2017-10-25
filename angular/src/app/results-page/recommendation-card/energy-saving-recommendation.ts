import {EnergySavingMeasureResponse} from '../../common/energy-calculation-api-service/response/energy-saving-measure-response';

export class EnergySavingRecommendation {
    recommendationTypeCode: string;
    costSavingPoundsPerYear: number;
    energySavingKwhPerYear: number;

    constructor(
        recommendationTypeCode: string,
        energySavingMeasureResponse: EnergySavingMeasureResponse
    ) {
        this.recommendationTypeCode = recommendationTypeCode;
        this.costSavingPoundsPerYear = energySavingMeasureResponse.cost_saving;
        this.energySavingKwhPerYear = energySavingMeasureResponse.energy_saving;
    }
}