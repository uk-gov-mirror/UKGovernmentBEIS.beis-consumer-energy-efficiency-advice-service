import {values} from "lodash-es";
import {MeasureContent} from "../../../shared/energy-saving-measure-content-service/measure-content";

export enum EnergyEfficiencyRecommendationTag {
    None = 0,
    QuickWin = 1,
    SmallSpend = 1 << 1,
    LongerTerm = 1 << 2,
    Grant = 1 << 3
}

export function getTagDescription(energyEfficiencyRecommendationTag: EnergyEfficiencyRecommendationTag) {
    switch (energyEfficiencyRecommendationTag) {
        case EnergyEfficiencyRecommendationTag.QuickWin:    { return 'Quick Win'; }
        case EnergyEfficiencyRecommendationTag.SmallSpend:  { return 'Small Spend'; }
        case EnergyEfficiencyRecommendationTag.LongerTerm:  { return 'Longer Term'; }
        case EnergyEfficiencyRecommendationTag.Grant:       { return 'Grant'; }
    }
}

export function getTagClassName(energyEfficiencyRecommendationTag: EnergyEfficiencyRecommendationTag) {
    switch (energyEfficiencyRecommendationTag) {
        case EnergyEfficiencyRecommendationTag.QuickWin:    { return 'tag-quick-win'; }
        case EnergyEfficiencyRecommendationTag.SmallSpend:  { return 'tag-small-spend'; }
        case EnergyEfficiencyRecommendationTag.LongerTerm:  { return 'tag-longer-term'; }
        case EnergyEfficiencyRecommendationTag.Grant:       { return 'tag-grant'; }
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
            .reduce((result, value) => {
                result |= value;
                return result;
            }, EnergyEfficiencyRecommendationTag.None)
    }
    return tags;
}

const RECOMMENDATION_TAGS_BY_JSON_NAME = {
    tag_quick_win: EnergyEfficiencyRecommendationTag.QuickWin,
    tag_small_spend: EnergyEfficiencyRecommendationTag.SmallSpend,
    tag_longer_term: EnergyEfficiencyRecommendationTag.LongerTerm
};

export type RecommendationTagJsonName = keyof typeof RECOMMENDATION_TAGS_BY_JSON_NAME;