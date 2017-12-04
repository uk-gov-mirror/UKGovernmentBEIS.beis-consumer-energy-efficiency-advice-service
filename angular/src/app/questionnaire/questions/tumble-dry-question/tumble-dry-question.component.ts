import {Component} from "@angular/core";
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import toString from "lodash-es/toString";

@Component({
    selector: 'app-tumble-dry-question',
    templateUrl: './tumble-dry-question.component.html',
    styleUrls: ['./tumble-dry-question.component.scss'],
    animations: [slideInOutAnimation],
})
export class TumbleDryQuestionComponent extends QuestionBaseComponent {
    isInvalid: boolean;
    tumbleDryPercentageDisplay: number;
    textBoxFocused: boolean;

    get responseForAnalytics(): string {
        return toString(this.responseData.tumbleDryPercentage);
    }

    ngOnInit() {
        this.tumbleDryPercentageDisplay = this.responseData.tumbleDryPercentage;
    }

    updateResponseData(value) {
        if (value < 0 || value > 100) {
            this.isInvalid = true;
            this.responseData.tumbleDryPercentage = undefined;
        } else {
            this.isInvalid = false;
            this.responseData.tumbleDryPercentage = value;
        }
    }

    handleFormSubmit() {
        if (this.responseData.tumbleDryPercentage !== undefined) {
            this.complete.emit();
        }
    }
}
