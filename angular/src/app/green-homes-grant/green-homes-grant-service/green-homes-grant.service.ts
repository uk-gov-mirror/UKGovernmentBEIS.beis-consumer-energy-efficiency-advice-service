import {Injectable} from '@angular/core';
import {ResponseData} from '../../shared/response-data/response-data';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/reduce';
import isEqual from 'lodash-es/isEqual';
import clone from 'lodash-es/clone';
import {GreenHomesGrantEligibility} from "./green-homes-grant-eligibility";
import {Country} from "../../questionnaire/questions/postcode-epc-question/country";
import {
    EnergyEfficiencyRecommendationTag,
    getActiveTags
} from "../../energy-efficiency/energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag";
import {IncomeThresholdService} from "../../grants/national-grant-calculator/grants/eco-hhcro-help-to-heat/income-threshold-service/income-threshold.service";
import {OwnHome} from "../../questionnaire/questions/own-home-question/ownHome";

@Injectable()
export class GreenHomesGrantService {

    private cachedResponseData: ResponseData;
    private _eligibility: Observable<GreenHomesGrantEligibility>;

    constructor(
        private responseData: ResponseData,
        private incomeThresholdService: IncomeThresholdService
    ) {}

    public hasGHGTag(flagValues: number) {
        const tags = getActiveTags(flagValues);
        return tags.includes(EnergyEfficiencyRecommendationTag.GHGPrimary) || tags.includes(EnergyEfficiencyRecommendationTag.GHGSecondary);
    }

    public getEligibility(): Observable<GreenHomesGrantEligibility> {
        if (!isEqual(this.responseData, this.cachedResponseData) || !this._eligibility) {
            this.cachedResponseData = clone(this.responseData);
            this._eligibility = this.calculateEligibility(this.responseData);
        }
        return this._eligibility;
    }

    private calculateEligibility(responseData: ResponseData): Observable<GreenHomesGrantEligibility> {
        if (responseData.country !== Country.England || responseData.newBuild || responseData.ownsHome === OwnHome.Tenant) {
            return Observable.of(GreenHomesGrantEligibility.Ineligible);
        }

        if (GreenHomesGrantService.receivesAnyBenefitOtherThanChildBenefits(responseData)) {
            return Observable.of(GreenHomesGrantEligibility.FullyEligible);
        }

        return this.getEligibilityFromChildBenefits(responseData);
    }

    private getEligibilityFromChildBenefits(responseData: ResponseData): Observable<GreenHomesGrantEligibility> {
        const relevantIncome = responseData.income;
        const numberOfAdults = responseData.numberOfAdults;
        const numberOfChildren = responseData.numberOfChildren;

        if (!responseData.receiveChildBenefits
            || !relevantIncome
            || !numberOfAdults
            || !numberOfChildren
        ) {
            return Observable.of(GreenHomesGrantEligibility.PartiallyEligible);
        }

        return this.getIncomeThresholdValue(numberOfAdults, numberOfChildren).map(
            thresholdValue => relevantIncome < thresholdValue
                ? GreenHomesGrantEligibility.FullyEligible
                : GreenHomesGrantEligibility.PartiallyEligible
        );
    }

    private getIncomeThresholdValue(
        numberOfAdults: number,
        numberOfChildren: number
    ): Observable<number> {
        const relevantIncomeThreshold = this.incomeThresholdService.fetchIncomeThresholds()
            .map(incomeThresholds => incomeThresholds['child-benefits']);

        return relevantIncomeThreshold
            .map(incomeThreshold => incomeThreshold.getIncomeThresholdByChildren(numberOfAdults))
            .map(incomeThresholdByChildren => incomeThresholdByChildren.getIncomeThresholdValue(numberOfChildren));
    }

    private static receivesAnyBenefitOtherThanChildBenefits(responseData: ResponseData): boolean {
        return responseData.receivePensionGuaranteeCredit
            || responseData.receiveIncomeRelatedBenefits
            || responseData.receiveSocietalBenefits
            || responseData.receiveDefenseRelatedBenefits;
    }
}
