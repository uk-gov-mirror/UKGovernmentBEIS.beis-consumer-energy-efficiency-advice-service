package uk.gov.beis.dceas.api;

import uk.gov.beis.dceas.controller.EnergySavingPlanController.SelectedEnergyEfficiencyRecommendation;

import java.util.List;

public abstract class PdfRecommendationParams {

    // Keep in sync with tenure-type.ts
    private static final int OWNER_TENURE_TYPE = 0;

    private List<SelectedEnergyEfficiencyRecommendation> recommendations;
    private Integer tenureType;

    public PdfRecommendationParams(List<SelectedEnergyEfficiencyRecommendation> recommendations, Integer tenureType) {
        this.recommendations = recommendations;
        this.tenureType = tenureType;
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
}
