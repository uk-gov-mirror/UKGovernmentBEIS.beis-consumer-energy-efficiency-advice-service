import {Component, Input, OnInit} from "@angular/core";
import {EnergyEfficiencyRecommendation} from "../../../shared/recommendations-service/energy-efficiency-recommendation";
import {
    EnergyEfficiencyRecommendationTag,
    getActiveTags,
    getTagClassName,
    getTagDescription
} from "../recommendation-tags/energy-efficiency-recommendation-tag";
import {RecommendationsService} from "../../../shared/recommendations-service/recommendations.service";

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
    isMouseOverAddToPlanButton: boolean = false;

    @Input() recommendation: EnergyEfficiencyRecommendation;

    constructor(private recommendationsService: RecommendationsService) {
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

    mouseEnterAddToPlanButton(): void {
        this.isMouseOverAddToPlanButton = true;
    }

    mouseLeaveAddToPlanButton(): void {
        this.isMouseOverAddToPlanButton = false;
    }

    getAddToPlanButtonText(): string {
        if (!this.isAddedToPlan()) {
            return 'Add to plan';
        } else {
            return this.isMouseOverAddToPlanButton ? 'Remove from plan': 'Added to plan';
        }
    }

    toggleAddedToPlan(): void {
        this.recommendationsService.toggleAddedToPlan(this.recommendation);
    }

    isAddedToPlan(): boolean {
        return this.recommendationsService.isAddedToPlan(this.recommendation);
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