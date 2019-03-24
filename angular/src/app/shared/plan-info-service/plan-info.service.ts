import {ResponseData} from "../response-data/response-data";
import {RecommendationsService} from "../recommendations-service/recommendations.service";
import {Injectable} from '@angular/core';

@Injectable()
export class PlanInfoService {

    constructor(private responseData: ResponseData,
                private recommendationsService: RecommendationsService) {
    }

    public getPlanInfo() {
        // See uk.gov.beis.dceas.controller.EnergySavingPlanController.PlanInfo
        const recommendations = this.recommendationsService.getRecommendationsInPlan()
            .map(r => {
                if (r.isMeasure) {
                    return {
                        measureSlug: r.recommendationID,
                        nationalGrantForMeasureId: (r.grant && r.grant.grantId),
                        investmentPounds: r.investmentPounds,
                        minimumCostSavingPoundsPerYear: r.minimumCostSavingPoundsPerYear,
                        maximumCostSavingPoundsPerYear: r.maximumCostSavingPoundsPerYear
                    };
                } else {
                    return {
                        grantSlug: r.recommendationID,
                        investmentPounds: r.investmentPounds,
                        minimumCostSavingPoundsPerYear: r.minimumCostSavingPoundsPerYear,
                        maximumCostSavingPoundsPerYear: r.maximumCostSavingPoundsPerYear
                    };
                }
            });
        return {
            recommendations: recommendations,
            tenureType: this.responseData.tenureType
        };
    }
}
