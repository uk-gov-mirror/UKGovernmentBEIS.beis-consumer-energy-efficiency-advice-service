import {EnergySavingMeasureResponse} from "../../shared/energy-calculation-api-service/response/energy-saving-measure-response";
import {RecommendationMetadataResponse} from "../recommendation-service/recommendation-metadata-response";
import * as parse from "url-parse";

export class EnergySavingRecommendation {

    constructor(public investmentPounds: number,
                public costSavingPoundsPerYear: number,
                public energySavingKwhPerYear: number,
                public readMoreRoute: string,
                public headline: string,
                public summary: string,
                public iconClassName: string) {
    }

    static fromResponseData(energySavingMeasureResponse: EnergySavingMeasureResponse,
                            recommendationMetadata: RecommendationMetadataResponse,
                            iconClassName: string): EnergySavingRecommendation {
        return new EnergySavingRecommendation(
            Math.floor(Math.random() * 99) + 1,
            energySavingMeasureResponse.cost_saving,
            energySavingMeasureResponse.energy_saving,
            parse(recommendationMetadata.acf.featured_page).pathname,
            recommendationMetadata.acf.headline,
            recommendationMetadata.acf.summary,
            iconClassName,
        );
    }
}