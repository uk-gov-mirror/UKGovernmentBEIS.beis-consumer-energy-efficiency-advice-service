import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-bedrooms-question',
    templateUrl: './bedrooms-question.component.html',
    styleUrls: ['./bedrooms-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class BedroomsQuestionComponent extends QuestionBaseComponent<number> implements OnInit {
    constructor() {
        super();
    }

    ngOnInit() {
        this.response = this.response || 1;
    }

    handleFormSubmit() {
        if (this.response) {
            this.notifyOfCompletion();
        }
    }
}