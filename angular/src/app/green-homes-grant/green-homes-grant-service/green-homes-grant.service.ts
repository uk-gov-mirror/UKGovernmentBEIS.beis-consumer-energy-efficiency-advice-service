import {Injectable} from '@angular/core';
import {ResponseData} from '../../shared/response-data/response-data';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/reduce';
import {GreenHomesGrantEligibility} from "./green-homes-grant-eligibility";
import {EnergyEfficiencyRecommendationTag} from "../../energy-efficiency/energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag";
import {OwnHome} from "../../questionnaire/questions/own-home-question/ownHome";

@Injectable()
export class GreenHomesGrantService {

    constructor(private responseData: ResponseData,) {}

    public static hasGHGTag(tags) {
        return tags.includes(EnergyEfficiencyRecommendationTag.GHGPrimary)
            || tags.includes(EnergyEfficiencyRecommendationTag.GHGSecondary);
    }

    public getEligibility(): GreenHomesGrantEligibility {
        if (!this.responseData.englishProperty || this.responseData.newBuild || this.responseData.ownsHome === OwnHome.Tenant) {
            return GreenHomesGrantEligibility.Ineligible;
        }

        if (GreenHomesGrantService.receivesAnyBenefit(this.responseData)) {
            return GreenHomesGrantEligibility.FullyEligible;
        }

        return GreenHomesGrantEligibility.PartiallyEligible;
    }

    private static receivesAnyBenefit(responseData: ResponseData): boolean {
        return responseData.receivePensionGuaranteeCredit
            || responseData.receiveIncomeRelatedBenefits
            || responseData.receiveContributionBasedBenefits
            || responseData.receiveSocietalBenefits
            || responseData.receiveHousingBenefit;
    }
}
