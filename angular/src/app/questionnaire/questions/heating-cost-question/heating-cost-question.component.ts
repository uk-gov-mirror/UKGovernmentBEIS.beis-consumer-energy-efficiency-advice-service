import {Component} from "@angular/core";
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";

@Component({
    selector: 'app-heating-cost-question',
    templateUrl: './heating-cost-question.component.html',
    styleUrls: ['./heating-cost-question.component.scss'],
    animations: [slideInOutAnimation],
})
export class HeatingCostQuestionComponent extends QuestionBaseComponent {
    isInvalid: boolean;

    get response(): number {
        // this.responseData.fuelType
        return this.responseData.heatingCost;
    }

    set response(val: number) {
        this.responseData.heatingCost = val;
    }

    validateHeatingCost(value) {
        if (this.response < 0) {
            this.isInvalid = true;
            this.response = undefined;
        } else {
            this.isInvalid = false;
            this.response = value;
        }
    }
}
