import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {BehaviourQuestionnaire} from "./behaviour-questionnaire";
import {CommonQuestionsModule} from "../../common-questions/common-questions.module";
import {OccupantsQuestionComponent} from "./questions/occupants-question/occupants-question.component";

@NgModule({
    declarations: [
        OccupantsQuestionComponent,
    ],
    exports: [
        OccupantsQuestionComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        CommonQuestionsModule,
    ],
    entryComponents: [
        OccupantsQuestionComponent,
    ],
    providers: [BehaviourQuestionnaire]
})
export class BehaviourQuestionnaireModule {
}