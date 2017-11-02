import {QuestionBaseComponent, slideInOutAnimation} from "../../../../base-question/question-base-component";
import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-showers-question',
    templateUrl: './showers-question.component.html',
    animations: [slideInOutAnimation]
})
export class ShowersQuestionComponent extends QuestionBaseComponent<number> implements OnInit {

    ngOnInit() {
        this.response = this.response || 7;
    }

    get response(): number {
        return this.responseData.numberOfShowersPerWeek;
    }

    set response(val: number) {
        this.responseData.numberOfShowersPerWeek = val;
    }

    handleFormSubmit() {
        if (this.response) {
            this.complete.emit();
        }
    }
}