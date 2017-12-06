import {Component, EventEmitter, OnInit, Output, Input} from "@angular/core";
import {
    EnergyEfficiencyRecommendationTag,
    getTagClassName,
    getTagDescription
} from "../recommendation-tags/energy-efficiency-recommendation-tag";
import keys from "lodash-es/keys";

@Component({
    selector: 'app-recommendation-filter-control',
    templateUrl: './recommendation-filter-control.component.html',
    styleUrls: ['./recommendation-filter-control.component.scss']
})
export class RecommendationFilterControlComponent implements OnInit {

    @Input() selectedTags: EnergyEfficiencyRecommendationTag;
    @Output() selectedTagsChange = new EventEmitter<EnergyEfficiencyRecommendationTag>();

    tags: FilterControl<EnergyEfficiencyRecommendationTag>[];

    ngOnInit() {
        this.tags = keys(EnergyEfficiencyRecommendationTag)
            .map(x => parseInt(x))
            .filter(tag => !isNaN(tag))
            .filter(tag => tag !== EnergyEfficiencyRecommendationTag.None)
            .map(tag => {
                return {
                    value: tag,
                    description: getTagDescription(tag),
                    className: getTagClassName(tag)
                }
            });
    }

    shouldDisplayAsDeselected(tag: EnergyEfficiencyRecommendationTag): boolean {
        return !(this.selectedTags & tag);
    }

    isAnyTagSelected(): boolean {
        return this.selectedTags !== EnergyEfficiencyRecommendationTag.None;
    }

    clearFilters(): void {
        this.selectedTags = EnergyEfficiencyRecommendationTag.None;
        this.selectedTagsChange.emit(this.selectedTags);
    }

    onTagClicked(tag: EnergyEfficiencyRecommendationTag, event: MouseEvent): void {
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
            // Toggle the clicked tag
            this.selectedTags ^= tag;
        } else {
            // Select only the clicked tag
            this.selectedTags = tag;
        }
        this.selectedTagsChange.emit(this.selectedTags);
    }
}

interface FilterControl<T> {
    value: T;
    description: string;
    className: string;
}