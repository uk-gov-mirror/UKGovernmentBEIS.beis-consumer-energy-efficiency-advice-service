import {MeasureContent} from '../../../shared/energy-saving-measure-content-service/measure-content';

export enum EnergyEfficiencyRecommendationTag {
    TopRecommendations,
    QuickWin,
    SmallSpend,
    LongerTerm,
    Grant,
    FundingAvailable,
    GHGPrimary,
    GHGSecondary,
    GHGIneligible
}

export const GHG_ONLY_TAGS = [
    EnergyEfficiencyRecommendationTag.GHGPrimary,
    EnergyEfficiencyRecommendationTag.GHGSecondary,
    EnergyEfficiencyRecommendationTag.GHGIneligible
];

export function getTagDescription(energyEfficiencyRecommendationTag: EnergyEfficiencyRecommendationTag) {
    switch (energyEfficiencyRecommendationTag) {
        case EnergyEfficiencyRecommendationTag.QuickWin:            { return 'Quick Win'; }
        case EnergyEfficiencyRecommendationTag.SmallSpend:          { return 'Small Spend'; }
        case EnergyEfficiencyRecommendationTag.LongerTerm:          { return 'Longer Term'; }
        case EnergyEfficiencyRecommendationTag.Grant:               { return 'Grants'; }
        case EnergyEfficiencyRecommendationTag.TopRecommendations:  { return 'Our Top 5'; }
        case EnergyEfficiencyRecommendationTag.FundingAvailable:    { return 'Energy Funding'; }
        case EnergyEfficiencyRecommendationTag.GHGPrimary:          { return 'GHG Eligible (primary)'; }
        case EnergyEfficiencyRecommendationTag.GHGSecondary:        { return 'GHG Eligible (secondary)'; }
        case EnergyEfficiencyRecommendationTag.GHGIneligible:       { return 'Not GHG Eligible'; }
    }
}

export function getTagClassName(energyEfficiencyRecommendationTag: EnergyEfficiencyRecommendationTag) {
    switch (energyEfficiencyRecommendationTag) {
        case EnergyEfficiencyRecommendationTag.QuickWin:            { return 'tag-quick-win'; }
        case EnergyEfficiencyRecommendationTag.SmallSpend:          { return 'tag-small-spend'; }
        case EnergyEfficiencyRecommendationTag.LongerTerm:          { return 'tag-longer-term'; }
        case EnergyEfficiencyRecommendationTag.Grant:               { return 'tag-grant'; }
        case EnergyEfficiencyRecommendationTag.TopRecommendations:  { return 'tag-top-recommendations'; }
        case EnergyEfficiencyRecommendationTag.FundingAvailable:    { return 'tag-funding-available'; }
        case EnergyEfficiencyRecommendationTag.GHGPrimary:          { return 'tag-ghg-primary'; }
        case EnergyEfficiencyRecommendationTag.GHGSecondary:        { return 'tag-ghg-secondary'; }
        case EnergyEfficiencyRecommendationTag.GHGIneligible:       { return 'tag-ghg-ineligible'; }
    }
}

export function getTagsForMeasure(measureContent: MeasureContent): EnergyEfficiencyRecommendationTag[] {
    return measureContent.acf.tags
        .map(tagName => RECOMMENDATION_TAGS_BY_JSON_NAME[tagName])
        .filter(x => x);
}

const RECOMMENDATION_TAGS_BY_JSON_NAME: {[key: string]: EnergyEfficiencyRecommendationTag | undefined} = {
    tag_quick_win: EnergyEfficiencyRecommendationTag.QuickWin,
    tag_small_spend: EnergyEfficiencyRecommendationTag.SmallSpend,
    tag_longer_term: EnergyEfficiencyRecommendationTag.LongerTerm,
    tag_ghg_primary: EnergyEfficiencyRecommendationTag.GHGPrimary,
    tag_ghg_secondary: EnergyEfficiencyRecommendationTag.GHGSecondary
};
