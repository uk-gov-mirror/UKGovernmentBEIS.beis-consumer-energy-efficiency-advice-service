import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {Component} from "@angular/core";
import {ResponseData} from "../../../shared/response-data/response-data";

@Component({
    selector: 'app-grants-questionnaire-question',
    templateUrl: './grants-questionnaire-question.component.html',
    styleUrls: ['./grants-questionnaire-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class GrantsQuestionnaireQuestionComponent extends QuestionBaseComponent {

    constructor(responseData: ResponseData) {
        super(responseData);
    }

    get response(): boolean {
        return this.responseData.shouldIncludeGrantsQuestionnaire;
    }

    set response(val: boolean) {
        this.responseData.shouldIncludeGrantsQuestionnaire = val;
    }
}
