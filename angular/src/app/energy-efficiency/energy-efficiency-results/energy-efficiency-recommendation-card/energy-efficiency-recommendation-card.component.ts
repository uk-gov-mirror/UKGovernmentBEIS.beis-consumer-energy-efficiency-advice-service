import {Component, Input, OnInit} from "@angular/core";
import {EnergyEfficiencyRecommendation} from "../../recommendations/energy-efficiency-recommendation";
import {
    EnergyEfficiencyRecommendationTag,
    getActiveTags,
    getTagClassName,
    getTagDescription
} from "../recommendation-tags/energy-efficiency-recommendation-tag";
import {ResponseData} from "../../../shared/response-data/response-data";

@Component({
    selector: 'app-energy-efficiency-recommendation-card',
    templateUrl: './energy-efficiency-recommendation-card.component.html',
    styleUrls: ['./energy-efficiency-recommendation-card.component.scss']
})
export class EnergyEfficiencyRecommendationCardComponent implements OnInit {

    private static readonly POUNDS_ROUNDING = 5;

    isExpandedView: boolean = false;
    roundedInvestmentRequired: number;
    roundedMonthlySaving: number;
    tags: EnergyEfficiencyRecommendationTag[];

    @Input() recommendation: EnergyEfficiencyRecommendation;

    constructor(private responseData: ResponseData) {
    }

    ngOnInit() {
        this.roundedInvestmentRequired = EnergyEfficiencyRecommendationCardComponent
            .roundCostValue(this.recommendation.investmentPounds);
        this.roundedMonthlySaving = EnergyEfficiencyRecommendationCardComponent
            .getMonthlySaving(this.recommendation);
        this.tags = getActiveTags(this.recommendation.tags);
    }

    getTagDescription(tag: EnergyEfficiencyRecommendationTag) {
        return getTagDescription(tag);
    }

    getTagClassName(tag: EnergyEfficiencyRecommendationTag) {
        return getTagClassName(tag);
    }

    toggleExpandedView(): void {
        this.isExpandedView = !this.isExpandedView;
    }

    toggleAddedToPlan(): void {
        const recommendationIndexInPlan = this.getRecommendationIndexInPlan();
        if (recommendationIndexInPlan > -1) {
            // Remove recommendation from plan
            this.responseData.energyEfficiencyRecommendationsInPlan.splice(recommendationIndexInPlan, 1);
        } else {
            this.responseData.energyEfficiencyRecommendationsInPlan.push(this.recommendation);
        }
    }

    isAddedToPlan(): boolean {
        return this.getRecommendationIndexInPlan() > -1;
    }

    private getRecommendationIndexInPlan(): number {
        const recommendationIdsInPlan = this.responseData.energyEfficiencyRecommendationsInPlan
            .map(recommendation => recommendation.recommendationId);
        return recommendationIdsInPlan.indexOf(this.recommendation.recommendationId);
    }

    private static getMonthlySaving(recommendation: EnergyEfficiencyRecommendation): number {
        const costSavingPoundsPerMonth = recommendation.costSavingPoundsPerYear/12;
        return EnergyEfficiencyRecommendationCardComponent.roundCostValue(costSavingPoundsPerMonth);
    }

    private static roundCostValue(input: number): number {
        const roundingValue = input > EnergyEfficiencyRecommendationCardComponent.POUNDS_ROUNDING ?
            EnergyEfficiencyRecommendationCardComponent.POUNDS_ROUNDING :
            1;
        return Math.round(input/roundingValue) * roundingValue;
    }
}