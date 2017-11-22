import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {
    EnergyEfficiencyRecommendationTag,
    getTagClassName,
    getTagDescription
} from "../recommendation-tags/energy-efficiency-recommendation-tag";
import {keys} from "lodash-es";

@Component({
    selector: 'app-recommendation-filter-control',
    templateUrl: './recommendation-filter-control.component.html',
    styleUrls: ['./recommendation-filter-control.component.scss']
})
export class RecommendationFilterControlComponent implements OnInit {

    @Output() onSelectedTagsChanged = new EventEmitter<EnergyEfficiencyRecommendationTag>();

    selectedTags: EnergyEfficiencyRecommendationTag;
    tags: FilterControl<EnergyEfficiencyRecommendationTag>[];

    ngOnInit() {
        this.tags = keys(EnergyEfficiencyRecommendationTag)
            .map(tag => EnergyEfficiencyRecommendationTag[tag])
            .filter(tag => typeof tag === "number")
            .filter(tag => tag !== EnergyEfficiencyRecommendationTag.None)
            .map(tag => {
                return {
                    value: tag,
                    description: getTagDescription(tag),
                    className: getTagClassName(tag)
                }
            });
        this.clearFilters();
    }

    shouldDisplayAsSelected(tag: EnergyEfficiencyRecommendationTag): boolean {
        if (!this.isAnyTagSelected()) {
            // If no tags are selected, we display all as selected for cleaner UI
            return true;
        }
        return !!(this.selectedTags & tag);
    }

    isAnyTagSelected(): boolean {
        return this.selectedTags !== EnergyEfficiencyRecommendationTag.None;
    }

    clearFilters(): void {
        this.selectedTags = EnergyEfficiencyRecommendationTag.None;
        this.onSelectedTagsChanged.emit(this.selectedTags);
    }

    onTagClicked(tag: EnergyEfficiencyRecommendationTag, event: MouseEvent): void {
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
            // Toggle the clicked tag
            this.selectedTags ^= tag;
        } else {
            // Select only the clicked tag
            this.selectedTags = tag;
        }
        this.onSelectedTagsChanged.emit(this.selectedTags);
    }
}

interface FilterControl<T> {
    value: T;
    description: string;
    className: string;
}