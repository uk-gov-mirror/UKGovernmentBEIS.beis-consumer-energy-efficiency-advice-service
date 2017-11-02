import {QuestionBaseComponent, slideInOutAnimation} from "../../../../base-question/question-base-component";
import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-baths-question',
    templateUrl: './baths-question.component.html',
    animations: [slideInOutAnimation]
})
export class BathsQuestionComponent extends QuestionBaseComponent<number> implements OnInit {

    ngOnInit() {
        this.response = this.response || 7;
    }

    get response(): number {
        return this.responseData.numberOfBathsPerWeek;
    }

    set response(val: number) {
        this.responseData.numberOfBathsPerWeek = val;
    }

    handleFormSubmit() {
        if (this.response) {
            this.complete.emit();
        }
    }
}