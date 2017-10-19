import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {Component, OnInit} from "@angular/core";
import {ResponseData} from "../../../response-data/response-data";

@Component({
    selector: 'app-storeys-question',
    templateUrl: './storeys-question.component.html',
    styleUrls: ['./storeys-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class StoreysQuestionComponent extends QuestionBaseComponent<number> implements OnInit {

    ngOnInit() {
        this.response = this.response || 1;
    }

    get response(): number {
        return this.responseData.numberOfStoreys;
    }

    set response(val: number) {
        this.responseData.numberOfStoreys = val;
    }

    handleFormSubmit() {
        if (this.response) {
            this.notifyOfCompletion();
        }
    }
}
