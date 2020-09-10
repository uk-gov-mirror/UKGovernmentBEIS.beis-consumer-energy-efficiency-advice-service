package uk.gov.beis.dceas.data;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public enum EnergyEfficiencyRecommendationTag {
    TOP_RECOMMENDATIONS,
    QUICK_WIN,
    SMALL_SPEND,
    LONGER_TERM,
    GRANT,
    FUNDING_AVAILABLE,
    GHG_PRIMARY,
    GHG_SECONDARY;

    public static final Map<String, EnergyEfficiencyRecommendationTag> RECOMMENDATION_TAGS_BY_JSON_NAME
            = Collections.unmodifiableMap(new HashMap<String, EnergyEfficiencyRecommendationTag>() {{
        put("tag_quick_win", EnergyEfficiencyRecommendationTag.QUICK_WIN);
        put("tag_small_spend", EnergyEfficiencyRecommendationTag.SMALL_SPEND);
        put("tag_longer_term", EnergyEfficiencyRecommendationTag.LONGER_TERM);
        put("tag_ghg_primary", EnergyEfficiencyRecommendationTag.GHG_PRIMARY);
        put("tag_ghg_secondary", EnergyEfficiencyRecommendationTag.GHG_SECONDARY);
    }});
}
