import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {BehaviourQuestionnaire} from "./behaviour-questionnaire";
import {CommonQuestionsModule} from "../../common-questions/common-questions.module";
import {OccupantsQuestionComponent} from "./questions/occupants-question/occupants-question.component";
import {ShowersQuestionComponent} from "./questions/showers-question/showers-question.component";
import {FridgeFreezerQuestionComponent} from "./questions/fridge-freezer-question/fridge-freezer-question.component";
import {LivingRoomTemperatureQuestionComponent} from "./questions/living-room-temperature-question/living-room-temperature-question.component";
import {BathsQuestionComponent} from "./questions/baths-question/baths-question.component";

@NgModule({
    declarations: [
        OccupantsQuestionComponent,
        ShowersQuestionComponent,
        BathsQuestionComponent,
        FridgeFreezerQuestionComponent,
        LivingRoomTemperatureQuestionComponent
    ],
    exports: [
        OccupantsQuestionComponent,
        ShowersQuestionComponent,
        BathsQuestionComponent,
        FridgeFreezerQuestionComponent,
        LivingRoomTemperatureQuestionComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CommonQuestionsModule,
    ],
    entryComponents: [
        OccupantsQuestionComponent,
        ShowersQuestionComponent,
        BathsQuestionComponent,
        FridgeFreezerQuestionComponent,
        LivingRoomTemperatureQuestionComponent
    ],
    providers: [BehaviourQuestionnaire]
})
export class BehaviourQuestionnaireModule {
}