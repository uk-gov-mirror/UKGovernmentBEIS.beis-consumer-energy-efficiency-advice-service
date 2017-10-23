import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-recommendation-card',
    templateUrl: './recommendation-card.component.html',
    styleUrls: ['./recommendation-card.component.scss']
})
export class RecommendationCardComponent {
    @Input() iconClassName: string;
    @Input() description: string;
    @Input() savings: number;
}
