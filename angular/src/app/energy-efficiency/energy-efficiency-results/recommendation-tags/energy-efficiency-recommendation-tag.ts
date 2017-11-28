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
        if (measureContent.acf.tags.indexOf('tag_longer_term') > -1) {
            tags |= EnergyEfficiencyRecommendationTag.LongerTerm;
        }
        if (measureContent.acf.tags.indexOf('tag_quick_win') > -1) {
            tags |= EnergyEfficiencyRecommendationTag.QuickWin;
        }
        if (measureContent.acf.tags.indexOf('tag_small_spend') > -1) {
            tags |= EnergyEfficiencyRecommendationTag.SmallSpend;
        }
    }
    return tags;
}

export type RecommendationTagJsonName = 'tag_quick_win' | 'tag_small_spend' | 'tag_longer_term';