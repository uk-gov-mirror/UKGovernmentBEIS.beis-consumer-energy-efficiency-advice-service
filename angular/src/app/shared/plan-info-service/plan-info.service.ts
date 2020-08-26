import {ResponseData} from "../response-data/response-data";
import {RecommendationsService} from "../recommendations-service/recommendations.service";
import {Injectable} from '@angular/core';
import {EnergyEfficiencyRecommendation} from "../recommendations-service/energy-efficiency-recommendation";

@Injectable()
export class PlanInfoService {

    constructor(private responseData: ResponseData,
                private recommendationsService: RecommendationsService) {
    }

    public getUserPlanInfo() {
        return this.getPlanInfo(this.recommendationsService.getUserRecommendationsInPlan());
    }

    public getLandlordPlanInfo() {
        return this.getPlanInfo(this.recommendationsService.getLandlordRecommendationsInPlan());
    }

    private getPlanInfo(recommendationsInPlan: EnergyEfficiencyRecommendation[]) {
        // See uk.gov.beis.dceas.controller.EnergySavingPlanController.PlanInfo
        const recommendations = recommendationsInPlan
            .map(r => {
                if (r.isMeasure) {
                    return {
                        measureSlug: r.recommendationID,
                        nationalGrantForMeasureId: (r.grant && r.grant.grantId),
                        investmentPounds: r.installationCost.estimatedInvestment,
                        minimumCostSavingPoundsPerYear: r.minimumCostSavingPoundsPerYear,
                        maximumCostSavingPoundsPerYear: r.maximumCostSavingPoundsPerYear
                    };
                } else {
                    return {
                        grantSlug: r.recommendationID,
                        investmentPounds: r.installationCost.estimatedInvestment,
                        minimumCostSavingPoundsPerYear: r.minimumCostSavingPoundsPerYear,
                        maximumCostSavingPoundsPerYear: r.maximumCostSavingPoundsPerYear
                    };
                }
            });

        return {
            recommendations: recommendations,
            tenureType: this.responseData.tenureType,
            postcode: this.responseData.postcode,
        };
    }
}
