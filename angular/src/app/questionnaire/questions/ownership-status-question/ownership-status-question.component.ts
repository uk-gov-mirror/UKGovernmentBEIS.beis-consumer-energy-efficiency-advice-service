import {Component} from "@angular/core";
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";

@Component({
    selector: 'app-ownership-status-question',
    templateUrl: './ownership-status-question.component.html',
    styleUrls: ['./ownership-status-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class OwnershipStatusQuestionComponent extends QuestionBaseComponent {

    get response(): boolean {
        return this.responseData.homeowner;
    }

    set response(val: boolean) {
        this.responseData.homeowner = val;
    }
}
