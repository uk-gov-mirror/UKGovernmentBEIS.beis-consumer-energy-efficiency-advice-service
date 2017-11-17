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
    heatingCostDisplay: number;

    get responseForAnalytics(): string {
        return this.responseData.heatingCost.toString(10);
    }

    ngOnInit() {
        this.heatingCostDisplay = this.responseData.heatingCost;
    }

    updateResponseData(value) {
        if (value < 0) {
            this.isInvalid = true;
            this.responseData.heatingCost = undefined;
        } else {
            this.isInvalid = false;
            this.responseData.heatingCost = value;
        }
    }

    handleFormSubmit() {
        if (this.responseData.heatingCost !== undefined) {
            this.complete.emit();
        }
    }
}
