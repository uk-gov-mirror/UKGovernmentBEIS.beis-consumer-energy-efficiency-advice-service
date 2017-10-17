import {QuestionBaseComponent, slideInOutAnimation} from "../question.component";
import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-storeys-question',
    templateUrl: './storeys-question.component.html',
    styleUrls: ['./storeys-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class StoreysQuestionComponent extends QuestionBaseComponent<number> implements OnInit {
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
