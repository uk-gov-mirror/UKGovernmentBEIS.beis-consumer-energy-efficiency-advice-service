package uk.gov.beis.dceas.api;

import uk.gov.beis.dceas.controller.EnergySavingPlanController.SelectedEnergyEfficiencyRecommendation;

import java.util.List;

public class PdfUserRecommendationParams extends PdfRecommendationParams {

    public PdfUserRecommendationParams(List<SelectedEnergyEfficiencyRecommendation> recommendations, Integer tenureType, String postcode) {
        super(recommendations, tenureType, postcode);
    }

    @Override
    public String getTitle() {
        return "Your plan";
    }

    @Override
    public String getSubheading() {
        int numberOfRecommendations = getRecommendations().size();
        return numberOfRecommendations == 1
                ? "You have added 1 recommendation to your plan. You'll find all the steps and things you need to consider to implement this measure."
                : "You have added " + numberOfRecommendations +
                    " recommendations to your plan. You'll find all the steps and things you need to consider to implement those measures.";
    }

    @Override
    public String getFileDescription() {
        return "Energy Saving Plan";
    }
}
