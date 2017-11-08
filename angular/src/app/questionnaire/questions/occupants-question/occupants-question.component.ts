import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-occupants-question',
    templateUrl: './occupants-question.component.html',
    styleUrls: ['./occupants-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class OccupantsQuestionComponent extends QuestionBaseComponent implements OnInit {

    ngOnInit() {
        this.response = this.response || 1;
    }

    get response(): number {
        return this.responseData.numberOfOccupants;
    }

    set response(val: number) {
        this.responseData.numberOfOccupants = val;
    }

    handleFormSubmit() {
        if (this.response) {
            this.complete.emit();
        }
    }
}