package uk.gov.beis.dceas.data;

import java.util.HashMap;
import java.util.Map;

public enum EnergyEfficiencyRecommendationTag {
    NONE(0),
    TOP_RECOMMENDATIONS(1),
    QUICK_WIN(1 << 1),
    SMALL_SPEND(1 << 2),
    LONGER_TERM(1 << 3),
    GRANT(1 << 4),
    FUNDING_AVAILABLE(1 << 5),
    GHG_PRIMARY(1 << 6),
    GHG_SECONDARY(1 << 7);

    private final int value;

    EnergyEfficiencyRecommendationTag(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static final Map<String, EnergyEfficiencyRecommendationTag> RecommendationTagsByJsonName = new HashMap<String, EnergyEfficiencyRecommendationTag>() {{
        put("tag_quick_win", EnergyEfficiencyRecommendationTag.QUICK_WIN);
        put("tag_small_spend", EnergyEfficiencyRecommendationTag.SMALL_SPEND);
        put("tag_longer_term", EnergyEfficiencyRecommendationTag.LONGER_TERM);
        put("tag_ghg_primary", EnergyEfficiencyRecommendationTag.GHG_PRIMARY);
        put("tag_ghg_secondary", EnergyEfficiencyRecommendationTag.GHG_SECONDARY);
    }};
}
