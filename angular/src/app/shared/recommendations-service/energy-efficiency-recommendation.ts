import * as parse from 'url-parse';
import {RecommendationStep} from './recommendation-step';
import {
    EnergyEfficiencyRecommendationTag,
    getTagsForMeasure
} from '../../energy-efficiency/energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag';
import {MeasureResponse} from '../energy-calculation-api-service/response/measure-response';
import {MeasureContent} from '../energy-saving-measure-content-service/measure-content';
import concat from 'lodash-es/concat';
import head from 'lodash-es/head';
import {StandaloneNationalGrant} from '../../grants/model/standalone-national-grant';
import {NationalGrantForMeasure} from '../../grants/model/national-grant-for-measure';
import {isEnergySavingMeasureResponse} from '../energy-calculation-api-service/response/energy-saving-measure-response';

export class EnergyEfficiencyRecommendation {

    constructor(public investmentPounds: number,
                public lifetimeYears: number,
                public costSavingPoundsPerYear: number,
                public energySavingKwhPerYear: number,
                public readMoreRoute: string,
                public headline: string,
                public summary: string,
                public iconPath: string,
                public tags: EnergyEfficiencyRecommendationTag,
                public grant: NationalGrantForMeasure,
                public advantages: string[],
                public steps: RecommendationStep[],
                public isAddedToPlan: boolean) {
    }

    get costSavingPoundsPerMonth(): number {
        return this.costSavingPoundsPerYear / 12;
    }

    static fromMeasure(measureResponse: MeasureResponse,
                       measureContent: MeasureContent,
                       iconClassName: string,
                       grants: NationalGrantForMeasure[]): EnergyEfficiencyRecommendation {
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
        const grantSteps = (grant && grant.steps && grant.steps.length > 0) ? grant.steps : [];
        let costSavingPerYear: number = measureResponse.cost_saving;
        if (grant && grant.annualPaymentPoundsForMeasure) {
            costSavingPerYear += grant.annualPaymentPoundsForMeasure;
        }
        let lifetime: number = null;
        let estimatedInvestmentPounds: number = 0;
        if (isEnergySavingMeasureResponse(measureResponse)) {
            lifetime = measureResponse.lifetime;
            // Estimate investment cost as the midpoint of the range included in the response
            estimatedInvestmentPounds = (measureResponse.min_installation_cost +
                measureResponse.max_installation_cost) / 2;
        }
        return new EnergyEfficiencyRecommendation(
            estimatedInvestmentPounds,
            lifetime,
            costSavingPerYear,
            measureResponse.energy_saving,
            parse(measureContent.acf.featured_page).pathname,
            measureContent.acf.headline,
            measureContent.acf.summary,
            iconClassName,
            tags,
            grant,
            advantages,
            concat(measureSteps, grantSteps),
            false
        );
    }

    static fromNationalGrant(grant: StandaloneNationalGrant,
                             iconClassName: string): EnergyEfficiencyRecommendation {
        return new EnergyEfficiencyRecommendation(
            0, // No investment cost for a grant
            null, // No lifetime for a grant
            grant.annualPaymentPoundsStandalone || 0,
            0, // No energy saving from a grant
            '', // TODO: router link for more info (BEISDEAS-103)
            grant.name,
            grant.description,
            iconClassName,
            EnergyEfficiencyRecommendationTag.Grant,
            null,
            grant.advantages,
            grant.steps,
            false
        );
    }

    private static getDummyInvestmentAmount(tags: EnergyEfficiencyRecommendationTag): number {
        if (tags & EnergyEfficiencyRecommendationTag.QuickWin) {
            return 0;
        } else if (tags & EnergyEfficiencyRecommendationTag.SmallSpend) {
            return Math.floor(Math.random() * 99);
        } else if (tags & EnergyEfficiencyRecommendationTag.LongerTerm) {
            return Math.floor(Math.random() * 999);
        }
    }
}
