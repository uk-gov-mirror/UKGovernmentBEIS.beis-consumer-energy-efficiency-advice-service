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
import {
    EnergySavingMeasureResponse,
    isEnergySavingMeasureResponse
} from '../energy-calculation-api-service/response/energy-saving-measure-response';

export class EnergyEfficiencyRecommendation {

    public static grantIcons: { [grantId: string]: string } = {
        "eco-hhcro-help-to-heat": 'icons/home-improve.svg',
        "renewable-heat-incentive": 'icons/rhi.svg',
        "feed-in-tariff": 'icons/fit.svg',
        "winter-fuel-payments": 'icons/winter-fuel.svg',
        "warm-home-discount": 'icons/warm-home.svg',
        "cold-weather-payments": 'icons/cold-weather.svg',
    };

    constructor(public investmentPounds: number,
                public lifetimeYears: number,
                public costSavingPoundsPerYear: number,
                public energySavingKwhPerYear: number,
                public readMoreRoute: string,
                public headline: string,
                public summary: string,
                public whatItIs: string,
                public isItRightForMe: string,
                public iconPath: string,
                public tags: EnergyEfficiencyRecommendationTag,
                public grant: NationalGrantForMeasure,
                public advantages: string[],
                public steps: RecommendationStep[],
                public isAddedToPlan: boolean,
                public recommendationID: string,
                public measureCode: string) {
    }

    get costSavingPoundsPerMonth(): number {
        return this.costSavingPoundsPerYear / 12;
    }

    /**
     * Keep this in sync with EnergySavingPlanController.java `fromMeasure`
     */
    static fromMeasure(measureResponse: MeasureResponse,
                       measureCode: string,
                       measureContent: MeasureContent,
                       iconClassName: string,
                       grants: NationalGrantForMeasure[]): EnergyEfficiencyRecommendation {

        let tags: EnergyEfficiencyRecommendationTag = getTagsForMeasure(measureContent);

        const shouldIncludeGrantTag = grants && grants.length > 0;
        if (shouldIncludeGrantTag) {
            tags |= EnergyEfficiencyRecommendationTag.Grant;
        }

        const energySavingMeasureResponse = measureResponse as EnergySavingMeasureResponse;
        if ((energySavingMeasureResponse.FIT && energySavingMeasureResponse.FIT > 0)
            || (energySavingMeasureResponse.RHI && energySavingMeasureResponse.RHI > 0)) {

            tags |= EnergyEfficiencyRecommendationTag.FundingAvailable;
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
            '/measures/' + encodeURIComponent(measureContent.slug),
            measureContent.acf.headline,
            measureContent.acf.summary,
            measureContent.acf.what_it_is, // TODO:BEIS-309 possibly unused, dup with steps?
            measureContent.acf.is_it_right_for_me, // TODO:BEIS-309 possibly unused, dup with steps?
            iconClassName,
            tags,
            grant,
            advantages,
            concat(measureSteps, grantSteps),
            false,
            measureContent.slug,
            measureCode,
        );
    }

    /**
     * Keep this in sync with EnergySavingPlanController.java `fromNationalGrant`
     */
    static fromNationalGrant(grant: StandaloneNationalGrant): EnergyEfficiencyRecommendation {
        return new EnergyEfficiencyRecommendation(
            0, // No investment cost for a grant
            null, // No lifetime for a grant
            grant.annualPaymentPoundsStandalone || 0,
            0, // No energy saving from a grant
            grant.findOutMoreLink,
            grant.name,
            grant.description,
            null,
            null,
            EnergyEfficiencyRecommendation.grantIcons[grant.grantId],
            EnergyEfficiencyRecommendationTag.Grant,
            null,
            grant.advantages,
            grant.steps,
            false,
            grant.grantId,
            null,
        );
    }
}
