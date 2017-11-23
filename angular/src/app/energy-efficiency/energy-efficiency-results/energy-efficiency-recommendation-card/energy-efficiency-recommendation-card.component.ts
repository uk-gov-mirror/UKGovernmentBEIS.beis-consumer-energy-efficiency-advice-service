import {Component, Input, OnInit} from "@angular/core";
import {EnergyEfficiencyRecommendation} from "./energy-efficiency-recommendation";
import {
    EnergyEfficiencyRecommendationTag, getActiveTags, getTagClassName,
    getTagDescription
} from "../recommendation-tags/energy-efficiency-recommendation-tag";
import {GrantViewModel} from "../../../grants/model/grant-view-model";

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
    grant: GrantViewModel;

    @Input() recommendation: EnergyEfficiencyRecommendation;

    ngOnInit() {
        this.roundedInvestmentRequired = EnergyEfficiencyRecommendationCardComponent
            .roundCostValue(this.recommendation.investmentPounds);
        this.roundedMonthlySaving = EnergyEfficiencyRecommendationCardComponent
            .getMonthlySaving(this.recommendation);
        this.tags = getActiveTags(this.recommendation.tags);
        this.grant = this.recommendation.grants && this.recommendation.grants[0]
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