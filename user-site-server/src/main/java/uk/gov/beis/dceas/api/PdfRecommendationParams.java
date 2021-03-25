package uk.gov.beis.dceas.api;

import uk.gov.beis.dceas.controller.EnergySavingPlanController.SelectedEnergyEfficiencyRecommendation;

import java.util.List;

public abstract class PdfRecommendationParams {

    // Keep in sync with tenure-type.ts
    private static final int OWNER_TENURE_TYPE = 0;

    private final List<SelectedEnergyEfficiencyRecommendation> recommendations;
    private final Integer tenureType;
    private final String postcode;

    public PdfRecommendationParams(
            List<SelectedEnergyEfficiencyRecommendation> recommendations,
            Integer tenureType,
            String postcode
    ) {
        this.recommendations = recommendations;
        this.tenureType = tenureType;
        this.postcode = postcode;
    }

    public abstract String getTitle();
    public abstract String getSubheading();
    public abstract String getFileDescription();


    public List<SelectedEnergyEfficiencyRecommendation> getRecommendations() {
        return recommendations;
    }

    public boolean getShowMonthlySavings() {
        return tenureType != OWNER_TENURE_TYPE;
    }

    public String getPostcode() {
        return postcode;
    }
}
