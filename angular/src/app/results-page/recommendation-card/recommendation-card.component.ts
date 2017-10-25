import {Component, Input, OnInit} from '@angular/core';
import {EnergySavingRecommendation} from './energy-saving-recommendation';
import {RecommendationType, RecommendationTypeService} from './recommendation-type.service';

@Component({
    selector: 'app-recommendation-card',
    templateUrl: './recommendation-card.component.html',
    styleUrls: ['./recommendation-card.component.scss']
})
export class RecommendationCardComponent implements OnInit {
    recommendationTypeDetails: RecommendationType;
    savings: string;

    @Input() recommendation: EnergySavingRecommendation;

    ngOnInit() {
        this.recommendationTypeDetails = RecommendationTypeService.recommendationTypes[this.recommendation.recommendationTypeCode];
        this.savings = Math.round(this.recommendation.costSavingPoundsPerYear).toString();
    }
}
