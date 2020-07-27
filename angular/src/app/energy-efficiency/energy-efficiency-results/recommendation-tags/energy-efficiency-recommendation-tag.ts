import values from 'lodash-es/values';
import {MeasureContent} from '../../../shared/energy-saving-measure-content-service/measure-content';

export enum EnergyEfficiencyRecommendationTag {
    None = 0,
    TopRecommendations = 1,
    QuickWin = 1 << 1,
    SmallSpend = 1 << 2,
    LongerTerm = 1 << 3,
    Grant = 1 << 4,
    FundingAvailable = 1 << 5,
    GHGPrimary = 1 << 6,
    GHGSecondary = 1 << 7
}

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
    }
}

export function getActiveTags(flagValues: number): EnergyEfficiencyRecommendationTag[] {
    return values(EnergyEfficiencyRecommendationTag)
        .map(tag => parseInt(tag))
        .filter(tag => !isNaN(tag))
        .filter(tag => tag & flagValues);
}

export function getTagsForMeasure(measureContent: MeasureContent): EnergyEfficiencyRecommendationTag {
    let tags: EnergyEfficiencyRecommendationTag = EnergyEfficiencyRecommendationTag.None;
    if (measureContent.acf.tags) {
        tags = measureContent.acf.tags
            .map(tagName => RECOMMENDATION_TAGS_BY_JSON_NAME[tagName])
            .filter(x => x)
            .reduce((result, value) => {
                result |= value;
                return result;
            }, EnergyEfficiencyRecommendationTag.None);
    }
    return tags;
}

const RECOMMENDATION_TAGS_BY_JSON_NAME = {
    tag_quick_win: EnergyEfficiencyRecommendationTag.QuickWin,
    tag_small_spend: EnergyEfficiencyRecommendationTag.SmallSpend,
    tag_longer_term: EnergyEfficiencyRecommendationTag.LongerTerm,
    tag_ghg_primary: EnergyEfficiencyRecommendationTag.GHGPrimary,
    tag_ghg_secondary: EnergyEfficiencyRecommendationTag.GHGSecondary
};
