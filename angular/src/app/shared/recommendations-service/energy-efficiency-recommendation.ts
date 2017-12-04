import * as parse from "url-parse";
import {RecommendationStep} from "./recommendation-step";
import {
    EnergyEfficiencyRecommendationTag,
    getTagsForMeasure
} from "../../energy-efficiency/energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag";
import {GrantViewModel} from "../../grants/model/grant-view-model";
import {MeasureResponse} from "../energy-calculation-api-service/response/measure-response";
import {MeasureContent} from "../energy-saving-measure-content-service/measure-content";
import {concat, head} from "lodash-es";

export class EnergyEfficiencyRecommendation {

    constructor(public investmentPounds: number,
                public costSavingPoundsPerYear: number,
                public energySavingKwhPerYear: number,
                public readMoreRoute: string,
                public headline: string,
                public summary: string,
                public iconClassName: string,
                public tags: EnergyEfficiencyRecommendationTag,
                public grant: GrantViewModel,
                public advantages: string[],
                public steps: RecommendationStep[],
                public isAddedToPlan: boolean) {
    }

    get costSavingPoundsPerMonth(): number {
        return this.costSavingPoundsPerYear / 12;
    }

    static fromMeasure(energySavingMeasureResponse: MeasureResponse,
                       measureContent: MeasureContent,
                       iconClassName: string,
                       grants: GrantViewModel[]): EnergyEfficiencyRecommendation {
        let tags: EnergyEfficiencyRecommendationTag = getTagsForMeasure(measureContent);
        const shouldIncludeGrantTag = grants && grants.length > 0;
        if (shouldIncludeGrantTag) {
            tags |= EnergyEfficiencyRecommendationTag.Grant;
        }
        const advantages = measureContent.acf.advantages &&
            measureContent.acf.advantages.map(x => x.advantage);
        const measureSteps = measureContent.acf.steps && measureContent.acf.steps
                .map(stepResponse => new RecommendationStep(stepResponse));
        const grant = head(grants);
        const grantSteps = (grant && grant.steps.length > 0) ? grant.steps : [];
        return new EnergyEfficiencyRecommendation(
            EnergyEfficiencyRecommendation.getDummyInvestmentAmount(tags), // TODO: investment required for measures (BEISDEAS-56)
            energySavingMeasureResponse.cost_saving,
            energySavingMeasureResponse.energy_saving,
            parse(measureContent.acf.featured_page).pathname,
            measureContent.acf.headline,
            measureContent.acf.summary,
            iconClassName,
            tags,
            grant,
            advantages,
            concat(measureSteps, grantSteps),
            false
        )
    }

    static fromGrant(grantViewModel: GrantViewModel,
                     iconClassName: string): EnergyEfficiencyRecommendation {
        return new EnergyEfficiencyRecommendation(
            0, // No investment cost for a grant
            grantViewModel.annualPaymentPounds || 0,
            0, // No energy saving from a grant
            '', // TODO: router link for more info (BEISDEAS-103)
            grantViewModel.name,
            grantViewModel.description,
            iconClassName,
            EnergyEfficiencyRecommendationTag.Grant,
            null,
            grantViewModel.advantages,
            grantViewModel.steps,
            false
        );
    }

    private static getDummyInvestmentAmount(tags: EnergyEfficiencyRecommendationTag): number {
        if (tags & EnergyEfficiencyRecommendationTag.QuickWin) {
            return 0;
        } else if (tags & EnergyEfficiencyRecommendationTag.SmallSpend) {
            return Math.floor(Math.random() * 99);
        } else if (tags & EnergyEfficiencyRecommendationTag.LongerTerm) {
            return Math.floor(Math.random() * 999)
        }
    }
}