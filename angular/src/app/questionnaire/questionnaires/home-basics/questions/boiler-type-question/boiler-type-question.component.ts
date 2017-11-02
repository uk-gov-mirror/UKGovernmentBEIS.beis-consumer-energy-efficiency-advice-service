import {Component} from "@angular/core";
import {QuestionBaseComponent, slideInOutAnimation} from "../../../../base-question/question-base-component";

@Component({
    selector: 'app-boiler-type-question',
    templateUrl: './boiler-type-question.component.html',
    styleUrls: ['./boiler-type-question.component.scss'],
    animations: [slideInOutAnimation],
})
export class BoilerTypeQuestionComponent extends QuestionBaseComponent {
    get response(): boolean {
        return this.responseData.condensingBoiler;
    }

    set response(val: boolean) {
        this.responseData.condensingBoiler = val;
    }
}
