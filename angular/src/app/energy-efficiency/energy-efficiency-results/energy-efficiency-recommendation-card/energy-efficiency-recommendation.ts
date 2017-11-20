import {EnergySavingMeasureResponse} from "../../../shared/energy-calculation-api-service/response/energy-saving-measure-response";
import * as parse from "url-parse";
import {MeasureContent} from "../../../shared/energy-saving-measure-content-service/measure-content";
import {EnergyEfficiencyRecommendationTag} from "./energy-efficiency-recommendation-tag";

export class EnergyEfficiencyRecommendation {

    constructor(public investmentPounds: number,
                public costSavingPoundsPerYear: number,
                public energySavingKwhPerYear: number,
                public readMoreRoute: string,
                public headline: string,
                public summary: string,
                public iconClassName: string,
                public tags: EnergyEfficiencyRecommendationTag
    ) {
    }

    static fromMeasure(energySavingMeasureResponse: EnergySavingMeasureResponse,
                       measureContent: MeasureContent,
                       iconClassName: string
    ): EnergyEfficiencyRecommendation {
        return new EnergyEfficiencyRecommendation(
            0,
            energySavingMeasureResponse.cost_saving,
            energySavingMeasureResponse.energy_saving,
            parse(measureContent.acf.featured_page).pathname,
            measureContent.acf.headline,
            measureContent.acf.summary,
            iconClassName,
            EnergyEfficiencyRecommendationTag.LongerTerm
        )
    }
}