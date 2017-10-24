import {Component, Input, OnInit} from '@angular/core';
import {EnergySavingRecommendation} from './energy-saving-recommendation';
import {getDescription, getIconClassName, getRecommendationTypeFromCode} from './recommendation-type';

@Component({
    selector: 'app-recommendation-card',
    templateUrl: './recommendation-card.component.html',
    styleUrls: ['./recommendation-card.component.scss']
})
export class RecommendationCardComponent implements OnInit {
    description: string;
    iconClassName: string;
    savings: string;

    @Input() recommendation: EnergySavingRecommendation;

    ngOnInit() {
        this.description = getDescription(this.recommendation.recommendationType);
        this.iconClassName = getIconClassName(this.recommendation.recommendationType);
        this.savings = Math.round(this.recommendation.costSavingPoundsPerYear).toString();
    }
}
