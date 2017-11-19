import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {Component, OnInit} from "@angular/core";
import toString from "lodash-es/toString";

@Component({
    selector: 'app-storeys-question',
    templateUrl: './storeys-question.component.html',
    styleUrls: ['./storeys-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class StoreysQuestionComponent extends QuestionBaseComponent implements OnInit {
    get responseForAnalytics(): string {
        return toString(this.response);
    }

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
            this.complete.emit();
        }
    }
}
