import {EnergySavingMeasureResponse} from "../../shared/energy-calculation-api-service/response/energy-saving-measure-response";
import {RecommendationMetadataResponse} from "../recommendation-service/recommendation-metadata-response";
import * as parse from "url-parse";

export class EnergySavingRecommendation {
    costSavingPoundsPerYear: number;
    energySavingKwhPerYear: number;
    readMorePath: string;
    headline: string;

    constructor(energySavingMeasureResponse: EnergySavingMeasureResponse,
                recommendationMetadata: RecommendationMetadataResponse,
                public iconClassName: string
    ) {
        this.costSavingPoundsPerYear = energySavingMeasureResponse.cost_saving;
        this.energySavingKwhPerYear = energySavingMeasureResponse.energy_saving;
        this.readMorePath = parse(recommendationMetadata.acf.featured_page).pathname;
        this.headline = recommendationMetadata.acf.headline;
    }
}