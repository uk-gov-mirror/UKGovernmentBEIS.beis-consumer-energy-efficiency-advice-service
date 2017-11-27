import * as parse from "url-parse";
import {MeasureContent} from "../energy-saving-measure-content-service/measure-content";
import {MeasureResponse} from "../energy-calculation-api-service/response/measure-response";

export class EnergySavingRecommendation {

    constructor(public investmentPounds: number,
                public costSavingPoundsPerYear: number,
                public energySavingKwhPerYear: number,
                public readMoreRoute: string,
                public headline: string,
                public summary: string,
                public iconClassName: string) {
    }

    static fromResponseData(energySavingMeasureResponse: MeasureResponse,
                            recommendationMetadata: MeasureContent,
                            iconClassName: string): EnergySavingRecommendation {
        return new EnergySavingRecommendation(
            Math.floor(Math.random() * 99) + 1,
            energySavingMeasureResponse.cost_saving,
            energySavingMeasureResponse.energy_saving,
            parse(recommendationMetadata.featured_page).pathname,
            recommendationMetadata.headline,
            recommendationMetadata.summary,
            iconClassName,
        );
    }
}
