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
        this.adults = this.responseData.numberOfAdults || 1;
        this.children = this.responseData.numberOfChildren || 0;
    }

    get adults(): number {
        return this.responseData.numberOfAdults;
    }

    set adults(val: number) {
        this.responseData.numberOfAdults = val;
    }

    get children(): number {
        return this.responseData.numberOfChildren;
    }

    set children(val: number) {
        this.responseData.numberOfChildren = val;
    }

    handleFormSubmit() {
        this.complete.emit();
    }
}