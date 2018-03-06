import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-question-reason',
    templateUrl: './question-reason.component.html',
    styleUrls: ['./question-reason.component.scss']
})
export class QuestionReasonComponent {
    @Input() isExpanded: boolean;
    @Input() questionReason: string;

    toggleDisplay() {
        this.isExpanded = !this.isExpanded;
    }
}
