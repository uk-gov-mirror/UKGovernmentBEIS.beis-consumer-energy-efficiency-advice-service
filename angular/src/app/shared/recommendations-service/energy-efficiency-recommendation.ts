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
import {InstallationCost} from "./installation-cost";

export class EnergyEfficiencyRecommendation {

    public static grantIcons: { [grantId: string]: string } = {
        "eco-hhcro-help-to-heat": 'icons/home-improve.svg',
        "renewable-heat-incentive": 'icons/rhi.svg',
        "winter-fuel-payments": 'icons/winter-fuel.svg',
        "warm-home-discount": 'icons/warm-home.svg',
        "cold-weather-payments": 'icons/cold-weather.svg',
        "boiler-upgrade-scheme-ground-source-heat-pump": 'icons/warm-home.svg',
        "boiler-upgrade-scheme": 'icons/warm-home.svg',
    };

    constructor(public lifetimeYears: number,
                public costSavingPoundsPerYear: number,
                public minimumCostSavingPoundsPerYear: number,
                public maximumCostSavingPoundsPerYear: number,
                public energySavingKwhPerYear: number,
                public readMoreRoute: string,
                public headline: string,
                public summary: string,
                public whatItIs: string,
                public isItRightForMe: string,
                public iconPath: string,
                public tags: EnergyEfficiencyRecommendationTag[],
                public grant: NationalGrantForMeasure,
                public advantages: string[],
                public steps: RecommendationStep[],
                public isAddedToPlan: boolean,
                public recommendationID: string,
                public measureCode: string,
                public trustMarkTradeCodes: string[],
                public installationCost: InstallationCost) {
    }

    get isMeasure(): boolean {
        return this.measureCode !== null;
    }

    /**
     * Keep this in sync with EnergySavingPlanController.java `fromMeasure`
     */
    static fromMeasure(measureResponse: MeasureResponse,
                       measureCode: string,
                       measureContent: MeasureContent,
                       iconClassName: string,
                       grants: NationalGrantForMeasure[]): EnergyEfficiencyRecommendation {

        const tags: EnergyEfficiencyRecommendationTag[] = getTagsForMeasure(measureContent);

        if (grants && grants.length) {
            tags.push(EnergyEfficiencyRecommendationTag.Grant);
        }

        const energySavingMeasureResponse = measureResponse as EnergySavingMeasureResponse;
        if (energySavingMeasureResponse.RHI && energySavingMeasureResponse.RHI > 0) {
            tags.push(EnergyEfficiencyRecommendationTag.FundingAvailable);
        }

        const advantages = measureContent.acf.advantages &&
            measureContent.acf.advantages.map(x => x.advantage);
        const measureSteps = measureContent.acf.steps && measureContent.acf.steps
            .map(stepResponse => new RecommendationStep(stepResponse));
        const grant = head(grants);
        const grantSteps = (grant && grant.steps && grant.steps.length > 0) ? grant.steps : [];
        const costSavingUncertaintyPercentage = measureResponse.uncertainty;
        const costSavingUncertainty: number = costSavingUncertaintyPercentage / 100;
        let costSavingPerYear: number = measureResponse.cost_saving > 0 ? measureResponse.cost_saving : 0;
        let minimumCostSavingPerYear: number = costSavingPerYear * (1 - costSavingUncertainty);
        let maximumCostSavingPerYear: number = costSavingPerYear * (1 + costSavingUncertainty);
        if (grant && grant.annualPaymentPoundsForMeasure) {
            costSavingPerYear += grant.annualPaymentPoundsForMeasure;
            minimumCostSavingPerYear += grant.annualPaymentPoundsForMeasure;
            maximumCostSavingPerYear += grant.annualPaymentPoundsForMeasure;
        }
        const lifetime = isEnergySavingMeasureResponse(measureResponse) ? measureResponse.lifetime : null;
        const installationCost = EnergyEfficiencyRecommendation.getInstallationCostFromMeasure(measureResponse);
        const tradeCodes = measureContent.acf.trustmark_trade_codes
            ? measureContent.acf.trustmark_trade_codes.map(ttc => ttc.trade_code)
            : [];

        return new EnergyEfficiencyRecommendation(
            lifetime,
            costSavingPerYear,
            minimumCostSavingPerYear,
            maximumCostSavingPerYear,
            measureResponse.energy_saving,
            '/measures/' + encodeURIComponent(measureContent.slug),
            measureContent.acf.headline,
            measureContent.acf.summary,
            measureContent.acf.what_it_is,
            measureContent.acf.is_it_right_for_me,
            iconClassName,
            tags,
            grant,
            advantages,
            concat(measureSteps, grantSteps),
            false,
            measureContent.slug,
            measureCode,
            tradeCodes,
            installationCost
        );
    }

    /**
     * Keep this in sync with EnergySavingPlanController.java `fromNationalGrant`
     */
    static fromNationalGrant(grant: StandaloneNationalGrant): EnergyEfficiencyRecommendation {
        const costSavingPerYear = grant.annualPaymentPoundsStandalone || 0;
        return new EnergyEfficiencyRecommendation(
            null, // No lifetime for a grant
            costSavingPerYear,
            costSavingPerYear,
            costSavingPerYear,
            0, // No energy saving from a grant
            grant.findOutMoreLink,
            grant.name,
            grant.description,
            null,
            null,
            EnergyEfficiencyRecommendation.grantIcons[grant.grantId],
            [EnergyEfficiencyRecommendationTag.Grant],
            null,
            grant.advantages,
            grant.steps,
            false,
            grant.grantId,
            null,
            [],
            new InstallationCost(0, 0, true) // No investment cost for a grant
        );
    }

    private static getInstallationCostFromMeasure(measureResponse: MeasureResponse): InstallationCost {
        if (isEnergySavingMeasureResponse(measureResponse)) {
            return new InstallationCost(measureResponse.min_installation_cost,
                measureResponse.max_installation_cost, measureResponse.isBreRange);
        }
        return new InstallationCost(0, 0, true); // No installation cost;
    }
}
