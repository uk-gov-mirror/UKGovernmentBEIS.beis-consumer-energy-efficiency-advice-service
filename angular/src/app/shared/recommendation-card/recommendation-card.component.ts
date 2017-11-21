import {Component, Input, OnInit} from "@angular/core";
import {EnergySavingMeasure} from "./energy-saving-recommendation";

@Component({
    selector: 'app-recommendation-card',
    templateUrl: './recommendation-card.component.html',
    styleUrls: ['./recommendation-card.component.scss']
})
export class RecommendationCardComponent implements OnInit {
    savings: string;

    @Input() recommendation: EnergySavingMeasure;

    ngOnInit() {
        this.savings = Math.round(this.recommendation.costSavingPoundsPerYear).toString();
    }
}
