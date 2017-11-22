import {Component} from "@angular/core";
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import toString from "lodash-es/toString";

@Component({
    selector: 'app-heating-cost-question',
    templateUrl: './heating-cost-question.component.html',
    styleUrls: ['./heating-cost-question.component.scss'],
    animations: [slideInOutAnimation],
})
export class HeatingCostQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return toString(this.response);
    }

    ngOnInit() {
        this.response = this.response || 0;
    }

    get response(): number {
        return this.responseData.heatingCost;
    }

    set response(val: number) {
        this.responseData.heatingCost = val;
    }

    handleFormSubmit() {
        if (this.response) {
            this.complete.emit();
        }
    }
}
