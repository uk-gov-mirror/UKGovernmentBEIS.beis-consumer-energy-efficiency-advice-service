import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {RecommendationStep} from '../../../shared/recommendations-service/recommendation-step';
import padStart from 'lodash-es/padStart';
import {RecommendationsService} from "../../../shared/recommendations-service/recommendations.service";
import {AbTestingService} from "../../../shared/analytics/ab-testing.service";

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

    get formattedStepNumber(): string {
        const stepNumber = this.stepIndex + RecommendationStepCardComponent.INITIAL_STEP_NUMBER;
        return padStart(stepNumber.toString(), 2, '0');
    }

    toggleIsReadMoreExpanded(): void {
        this.isReadMoreExpanded = !this.isReadMoreExpanded;
        if (this.isReadMoreExpanded) {
            this.onAnalyticsEvent.emit('read-more_clicked');
        }
    }

    isExpanded(): boolean {
        return this.stepChecked === this.stepIndex;
    }
}
