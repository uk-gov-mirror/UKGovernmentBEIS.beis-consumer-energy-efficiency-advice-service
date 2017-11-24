import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {EnergyEfficiencyRecommendation} from "./energy-efficiency-recommendation";
import {
    EnergyEfficiencyRecommendationTag, getActiveTags, getTagClassName,
    getTagDescription
} from "../recommendation-tags/energy-efficiency-recommendation-tag";
import {roundToNearest} from "../../../shared/rounding/rounding";

@Component({
    selector: 'app-energy-efficiency-recommendation-card',
    templateUrl: './energy-efficiency-recommendation-card.component.html',
    styleUrls: ['./energy-efficiency-recommendation-card.component.scss']
})
export class EnergyEfficiencyRecommendationCardComponent implements OnInit {

    private static readonly MONTHLY_SAVING_POUNDS_ROUNDING = 5;

    isExpandedView: boolean = false;
    roundedMonthlySaving: number;
    tags: EnergyEfficiencyRecommendationTag[];

    @Input() recommendation: EnergyEfficiencyRecommendation;
    @Input() isAddedToPlan: boolean;
    @Output() isAddedToPlanChange = new EventEmitter<boolean>();

    ngOnInit() {
        this.roundedMonthlySaving = EnergyEfficiencyRecommendationCardComponent.getRoundedMonthlySaving(this.recommendation);
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
        this.isAddedToPlan = !this.isAddedToPlan;
        this.isAddedToPlanChange.emit(this.isAddedToPlan);
    }

    private static getRoundedMonthlySaving(recommendation: EnergyEfficiencyRecommendation): number {
        const monthlySaving = recommendation.costSavingPoundsPerMonth;
        const roundingValue =
            monthlySaving > EnergyEfficiencyRecommendationCardComponent.MONTHLY_SAVING_POUNDS_ROUNDING ?
            EnergyEfficiencyRecommendationCardComponent.MONTHLY_SAVING_POUNDS_ROUNDING : 1;
        return roundToNearest(monthlySaving, roundingValue);
    }
}