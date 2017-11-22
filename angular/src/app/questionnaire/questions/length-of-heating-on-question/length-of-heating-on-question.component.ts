import {Component} from "@angular/core";
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import toString from "lodash-es/toString";

@Component({
    selector: 'app-length-of-heating-on-question',
    templateUrl: './length-of-heating-on-question.component.html',
    animations: [slideInOutAnimation],
})
export class LengthOfHeatingOnQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return toString(this.response);
    }

    ngOnInit() {
        this.response = this.response || 0;
    }

    get response(): number {
        return this.responseData.lengthOfHeatingOn;
    }

    set response(val: number) {
        this.responseData.lengthOfHeatingOn = val;
    }

    handleFormSubmit() {
        if (this.response) {
            this.complete.emit();
        }
    }
}
