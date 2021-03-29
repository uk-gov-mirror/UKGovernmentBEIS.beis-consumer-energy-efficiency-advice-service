package uk.gov.beis.dceas.api;

import uk.gov.beis.dceas.controller.EnergySavingPlanController.SelectedEnergyEfficiencyRecommendation;

import java.util.List;

public class PdfLandlordRecommendationParams extends PdfRecommendationParams {
    public PdfLandlordRecommendationParams(List<SelectedEnergyEfficiencyRecommendation> recommendations, Integer tenureType, String postcode) {
        super(recommendations, tenureType, postcode);
    }

    @Override
    public String getTitle() {
        return "Landlord recommendations";
    }

    @Override
    public String getSubheading() {
        int numberOfRecommendations = getRecommendations().size();
        return numberOfRecommendations == 1
                ? "You have added 1 recommendation to your plan. You'll find all the steps and things your landlord needs to implement this measure."
                : "You have added " + numberOfRecommendations +
                    " recommendations to your plan. You'll find all the steps and things your landlord needs to implement those measures.";
    }

    @Override
    public String getFileDescription() {
        return "Landlord Recommendations";
    }
}
