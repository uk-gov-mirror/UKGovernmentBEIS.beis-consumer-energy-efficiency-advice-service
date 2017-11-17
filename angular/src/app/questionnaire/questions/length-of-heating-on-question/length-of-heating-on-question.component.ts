import {Component} from "@angular/core";
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";

@Component({
    selector: 'app-length-of-heating-on-question',
    templateUrl: './length-of-heating-on-question.component.html',
    styleUrls: ['./length-of-heating-on-question.component.scss'],
    animations: [slideInOutAnimation],
})
export class LengthOfHeatingOnQuestionComponent extends QuestionBaseComponent {
    isInvalid: boolean;
    lengthOfHeatingOnDisplay: number;

    ngOnInit() {
        this.lengthOfHeatingOnDisplay = this.responseData.lengthOfHeatingOn;
    }

    validateLengthOfHeatingOn(value) {
        if (value < 0 || value > 24) {
            this.isInvalid = true;
            this.responseData.lengthOfHeatingOn = undefined;
        } else {
            this.isInvalid = false;
            this.responseData.lengthOfHeatingOn = value;
        }
    }

    handleFormSubmit() {
        if (this.responseData.lengthOfHeatingOn) {
            this.complete.emit();
        }
    }
}
