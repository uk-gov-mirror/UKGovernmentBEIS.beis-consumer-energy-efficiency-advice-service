import {EnergySavingMeasureResponse} from "../../shared/energy-calculation-api-service/response/energy-saving-measure-response";
import {RecommendationMetadataResponse} from "../recommendation-service/recommendation-metadata-response";
import {WordpressPageRoutingService} from "../../shared/wordpress-pages-service/wordpress-page-routing.service";

export class EnergySavingRecommendation {
    investmentPounds: number;
    costSavingPoundsPerYear: number;
    energySavingKwhPerYear: number;
    readMoreRoute: string;
    headline: string;
    summary: string;

    constructor(energySavingMeasureResponse: EnergySavingMeasureResponse,
                recommendationMetadata: RecommendationMetadataResponse,
                public iconClassName: string
    ) {
        // TODO: Make this not made up
        this.investmentPounds = Math.floor(Math.random() * 99) + 1;
        this.costSavingPoundsPerYear = energySavingMeasureResponse.cost_saving;
        this.energySavingKwhPerYear = energySavingMeasureResponse.energy_saving;
        this.readMoreRoute = WordpressPageRoutingService.getRouteForWordpressUrl(recommendationMetadata.acf.featured_page);
        this.headline = recommendationMetadata.acf.headline;
        this.summary = recommendationMetadata.acf.summary;
    }
}