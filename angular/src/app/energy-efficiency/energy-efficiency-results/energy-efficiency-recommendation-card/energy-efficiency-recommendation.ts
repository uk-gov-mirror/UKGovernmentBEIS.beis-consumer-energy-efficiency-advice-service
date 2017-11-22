import {EnergySavingMeasureResponse} from "../../../shared/energy-calculation-api-service/response/energy-saving-measure-response";
import * as parse from "url-parse";
import {MeasureContent} from "../../../shared/energy-saving-measure-content-service/measure-content";
import {EnergyEfficiencyRecommendationTag} from "./energy-efficiency-recommendation-tag";
import {GrantViewModel} from "../../../grants/model/grant-view-model";

export class EnergyEfficiencyRecommendation {

    constructor(public investmentPounds: number,
                public costSavingPoundsPerYear: number,
                public energySavingKwhPerYear: number,
                public readMoreRoute: string,
                public headline: string,
                public summary: string,
                public iconClassName: string,
                public tags: EnergyEfficiencyRecommendationTag,
                public grants: GrantViewModel[]) {
    }

    static fromMeasure(
       energySavingMeasureResponse: EnergySavingMeasureResponse,
       measureContent: MeasureContent,
       iconClassName: string,
       grants: GrantViewModel[]
    ): EnergyEfficiencyRecommendation {
        return new EnergyEfficiencyRecommendation(
            Math.floor(Math.random() * 99) + 1, // TODO: investment required for measures (BEISDEAS-56)
            energySavingMeasureResponse.cost_saving,
            energySavingMeasureResponse.energy_saving,
            parse(measureContent.acf.featured_page).pathname,
            measureContent.acf.headline,
            measureContent.acf.summary,
            iconClassName,
            EnergyEfficiencyRecommendationTag.LongerTerm,
            grants
        )
    }

    static fromGrant(
        grantViewModel: GrantViewModel,
        iconClassName: string
    ): EnergyEfficiencyRecommendation {
        return new EnergyEfficiencyRecommendation(
            0, // No investment cost for a grant
            grantViewModel.annualPaymentPounds || 0,
            0, // No energy saving from a grant
            '', // TODO: router link for more info (BEISDEAS-103)
            grantViewModel.name,
            grantViewModel.description,
            iconClassName,
            EnergyEfficiencyRecommendationTag.Grant,
            [grantViewModel]
        );
    }
}