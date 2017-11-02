import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {BehaviourQuestionnaire} from "./behaviour-questionnaire";
import {CommonQuestionsModule} from "../../common-questions/common-questions.module";
import {OccupantsQuestionComponent} from "./questions/occupants-question/occupants-question.component";
import { FridgeFreezerQuestionComponent } from './questions/fridge-freezer-question/fridge-freezer-question.component';

@NgModule({
    declarations: [
        OccupantsQuestionComponent,
        FridgeFreezerQuestionComponent,
    ],
    exports: [
        OccupantsQuestionComponent,
        FridgeFreezerQuestionComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        CommonQuestionsModule,
    ],
    entryComponents: [
        OccupantsQuestionComponent,
        FridgeFreezerQuestionComponent,
    ],
    providers: [BehaviourQuestionnaire]
})
export class BehaviourQuestionnaireModule {
}