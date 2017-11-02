import {EnergySavingMeasureResponse} from "../../shared/energy-calculation-api-service/response/energy-saving-measure-response";
import {UrlParser} from '../../common/url-parser/url-parser';
import {RecommendationMetadataResponse} from "../recommendation-service/recommendation-metadata-response";

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
        this.readMorePath = UrlParser.getUrlPath(recommendationMetadata.acf.featured_page);
        this.headline = recommendationMetadata.acf.headline;
    }
}