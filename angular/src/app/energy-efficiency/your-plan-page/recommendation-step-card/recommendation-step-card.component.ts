import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {RecommendationStep} from '../../../shared/recommendations-service/recommendation-step';
import padStart from 'lodash-es/padStart';

@Component({
    selector: 'app-recommendation-step-card',
    templateUrl: './recommendation-step-card.component.html',
    styleUrls: ['./recommendation-step-card.component.scss']
})
export class RecommendationStepCardComponent implements OnInit {

    @Input() step: RecommendationStep;
    @Input() stepIndex: number;
    @Input() stepChecked: number;
    @Output() onAnalyticsEvent: EventEmitter<string> = new EventEmitter<string>();

    isReadMoreExpanded: boolean;

    private static readonly INITIAL_STEP_NUMBER: number = 1;

    ngOnInit() {
    }

    isExpanded(): boolean {
        return this.stepChecked === this.stepIndex;
    }
}
