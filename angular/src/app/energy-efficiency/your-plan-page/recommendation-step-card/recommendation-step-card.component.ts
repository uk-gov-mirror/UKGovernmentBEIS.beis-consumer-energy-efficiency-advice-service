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
    @Output() onAnalyticsEvent: EventEmitter<string> = new EventEmitter<string>();

    isExpanded: boolean;
    isReadMoreExpanded: boolean;

    private static readonly INITIAL_STEP_NUMBER: number = 1;

    ngOnInit() {
        this.isExpanded = this.stepIndex === 0;
        console.log(this.step);
    }

    get formattedStepNumber(): string {
        const stepNumber = this.stepIndex + RecommendationStepCardComponent.INITIAL_STEP_NUMBER;
        return padStart(stepNumber.toString(), 2, '0');
    }

    toggleIsExpanded(): void {
        this.isExpanded = !this.isExpanded;
        if (this.isExpanded) {
            this.onAnalyticsEvent.emit('expand-step_clicked');
        }
    }

    toggleIsReadMoreExpanded(): void {
        this.isReadMoreExpanded = !this.isReadMoreExpanded;
        if (this.isReadMoreExpanded) {
            this.onAnalyticsEvent.emit('read-more_clicked');
        }
    }
}
