import {Injectable} from '@angular/core';
import {ResponseData} from '../../shared/response-data/response-data';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/reduce';
import isEqual from 'lodash-es/isEqual';
import clone from 'lodash-es/clone';
import {GreenHomesGrantEligibility} from "./green-homes-grant-eligibility";
import {EnergyEfficiencyRecommendationTag} from "../../energy-efficiency/energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag";
import {OwnHome} from "../../questionnaire/questions/own-home-question/ownHome";

@Injectable()
export class GreenHomesGrantService {

    private cachedResponseData: ResponseData;
    private _eligibility: Observable<GreenHomesGrantEligibility>;

    constructor(
        private responseData: ResponseData,
    ) {}

    public static hasGHGTag(tags) {
        return tags.includes(EnergyEfficiencyRecommendationTag.GHGPrimary)
            || tags.includes(EnergyEfficiencyRecommendationTag.GHGSecondary);
    }

    public getEligibility(): Observable<GreenHomesGrantEligibility> {
        if (!isEqual(this.responseData, this.cachedResponseData) || !this._eligibility) {
            this.cachedResponseData = clone(this.responseData);
            this._eligibility = GreenHomesGrantService.calculateEligibility(this.responseData);
        }
        return this._eligibility;
    }

    private static calculateEligibility(responseData: ResponseData): Observable<GreenHomesGrantEligibility> {
        if (!responseData.englishProperty || responseData.newBuild || responseData.ownsHome === OwnHome.Tenant) {
            return Observable.of(GreenHomesGrantEligibility.Ineligible);
        }

        if (GreenHomesGrantService.receivesAnyBenefit(responseData)) {
            return Observable.of(GreenHomesGrantEligibility.FullyEligible);
        }

        return Observable.of(GreenHomesGrantEligibility.PartiallyEligible);
    }

    private static receivesAnyBenefit(responseData: ResponseData): boolean {
        return responseData.receivePensionGuaranteeCredit
            || responseData.receiveIncomeRelatedBenefits
            || responseData.receiveContributionBasedBenefits
            || responseData.receiveSocietalBenefits
            || responseData.receiveHousingBenefit;
    }
}
