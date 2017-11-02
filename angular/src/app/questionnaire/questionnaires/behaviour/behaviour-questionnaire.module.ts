import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {BehaviourQuestionnaire} from "./behaviour-questionnaire";
import {CommonQuestionsModule} from "../../common-questions/common-questions.module";
import {OccupantsQuestionComponent} from "./questions/occupants-question/occupants-question.component";
import {ShowersQuestionComponent} from "./questions/showers-question/showers-question.component";

@NgModule({
    declarations: [
        OccupantsQuestionComponent,
        ShowersQuestionComponent
    ],
    exports: [
        OccupantsQuestionComponent,
        ShowersQuestionComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CommonQuestionsModule,
    ],
    entryComponents: [
        OccupantsQuestionComponent,
        ShowersQuestionComponent
    ],
    providers: [BehaviourQuestionnaire]
})
export class BehaviourQuestionnaireModule {
}