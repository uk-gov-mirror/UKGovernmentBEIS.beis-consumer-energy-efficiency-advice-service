import * as parse from "url-parse";
import {RecommendationStep} from "./recommendation-step";
import {
    EnergyEfficiencyRecommendationTag,
    getTagsForMeasure
} from "../../energy-efficiency/energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag";
import {MeasureResponse} from "../energy-calculation-api-service/response/measure-response";
import {MeasureContent} from "../energy-saving-measure-content-service/measure-content";
import {concat, head} from "lodash-es";
import {EnergySavingMeasureResponse} from "../energy-calculation-api-service/response/energy-saving-measure-response";
import {StandaloneNationalGrant} from "../../grants/model/standalone-national-grant";
import {NationalGrantForMeasure} from "../../grants/model/national-grant-for-measure";

export class EnergyEfficiencyRecommendation {

    constructor(public recommendationId: string,
                public investmentPounds: number,
                public costSavingPoundsPerYear: number,
                public energySavingKwhPerYear: number,
                public readMoreRoute: string,
                public headline: string,
                public summary: string,
                public iconClassName: string,
                public tags: EnergyEfficiencyRecommendationTag,
                public grant: NationalGrantForMeasure,
                public advantages: string[],
                public steps: RecommendationStep[]) {
    }

    get costSavingPoundsPerMonth(): number {
        return this.costSavingPoundsPerYear / 12;
    }

    static fromMeasure(measureCode: string,
                       measureResponse: MeasureResponse,
                       measureContent: MeasureContent,
                       iconClassName: string,
                       grants: NationalGrantForMeasure[]): EnergyEfficiencyRecommendation {
        let tags: EnergyEfficiencyRecommendationTag = getTagsForMeasure(measureContent);
        const shouldIncludeGrantTag = grants && grants.length > 0;
        if (shouldIncludeGrantTag) {
            tags |= EnergyEfficiencyRecommendationTag.Grant;
        }
        const advantagesSplitByLine = measureContent.acf.advantages &&
            measureContent.acf.advantages.match(/[^\r\n]+/g);
        const measureSteps = measureContent.acf.steps && measureContent.acf.steps
                .map(stepResponse => new RecommendationStep(stepResponse));
        const grant = head(grants);
        const grantSteps = (grant && grant.steps.length > 0) ? grant.steps : [];
        let costSavingPerYear: number = measureResponse.cost_saving;
        if (grant && grant.annualPaymentPoundsForMeasure) {
            costSavingPerYear += grant.annualPaymentPoundsForMeasure;
        }
        return new EnergyEfficiencyRecommendation(
            measureContent.acf.measure_code,
            EnergyEfficiencyRecommendation.getDummyInvestmentAmount(tags), // TODO: investment required for measures (BEISDEAS-56)
            costSavingPerYear,
            measureResponse.energy_saving,
            parse(measureContent.acf.featured_page).pathname,
            measureContent.acf.headline,
            measureContent.acf.summary,
            iconClassName,
            tags,
            grant,
            advantagesSplitByLine,
            concat(measureSteps, grantSteps)
        )
    }

    static fromNationalGrant(grant: StandaloneNationalGrant,
                             iconClassName: string): EnergyEfficiencyRecommendation {
        return new EnergyEfficiencyRecommendation(
            grant.grantId,
            0, // No investment cost for a grant
            grant.annualPaymentPoundsStandalone || 0,
            0, // No energy saving from a grant
            '', // TODO: router link for more info (BEISDEAS-103)
            grant.name,
            grant.description,
            iconClassName,
            EnergyEfficiencyRecommendationTag.Grant,
            null,
            grant.advantages,
            grant.steps
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