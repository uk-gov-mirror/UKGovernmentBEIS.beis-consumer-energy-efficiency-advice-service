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
import {ShowerTypeQuestionComponent} from "./questions/shower-type-question/shower-type-question.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        OccupantsQuestionComponent,
        ShowerTypeQuestionComponent,
        ShowersQuestionComponent,
        BathsQuestionComponent,
        FridgeFreezerQuestionComponent,
        LivingRoomTemperatureQuestionComponent
    ],
    exports: [
        OccupantsQuestionComponent,
        ShowerTypeQuestionComponent,
        ShowersQuestionComponent,
        BathsQuestionComponent,
        FridgeFreezerQuestionComponent,
        LivingRoomTemperatureQuestionComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CommonQuestionsModule,
        FormsModule
    ],
    entryComponents: [
        OccupantsQuestionComponent,
        ShowerTypeQuestionComponent,
        ShowersQuestionComponent,
        BathsQuestionComponent,
        FridgeFreezerQuestionComponent,
        LivingRoomTemperatureQuestionComponent
    ],
    providers: [BehaviourQuestionnaire]
})
export class BehaviourQuestionnaireModule {
}