import {Injectable} from '@angular/core';
import {ResponseData} from '../../shared/response-data/response-data';
import {EnergyEfficiencyRecommendationTag} from "../../energy-efficiency/energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag";
import {isTenant} from "../../questionnaire/questions/tenure-type-question/tenure-type";

@Injectable()
export class GreenHomesGrantService {

    constructor(private responseData: ResponseData) {}

    public static hasGHGTag(tags) {
        return tags.includes(EnergyEfficiencyRecommendationTag.GHGPrimary)
            || tags.includes(EnergyEfficiencyRecommendationTag.GHGSecondary);
    }

    public shouldShowGhgContext(): boolean {
        return this.responseData.englishProperty
            && !this.responseData.newBuild
            && !isTenant(this.responseData.tenureType);
    }
}
