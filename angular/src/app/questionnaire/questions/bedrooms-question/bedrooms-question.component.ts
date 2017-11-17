import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {Component, OnInit} from "@angular/core";
import toString from "lodash-es/toString";

@Component({
    selector: 'app-bedrooms-question',
    templateUrl: './bedrooms-question.component.html',
    styleUrls: ['./bedrooms-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class BedroomsQuestionComponent extends QuestionBaseComponent implements OnInit {
    get responseForAnalytics(): string {
        return toString(this.response);
    };

    ngOnInit() {
        this.response = this.response || 1;
    }

    get response(): number {
        return this.responseData.numberOfBedrooms;
    }

    set response(val: number) {
        this.responseData.numberOfBedrooms = val;
    }

    handleFormSubmit() {
        if (this.response) {
            this.complete.emit();
        }
    }
}