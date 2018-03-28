import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {RoutingModule} from "../app-routing.module";
import {QuestionnaireModule} from "../questionnaire/questionnaire.module";
import {FormsModule} from "@angular/forms";
import {MeesQuestionnaireComponent} from "./mees-questionnaire/mees-questionnaire.component";

@NgModule({
    declarations: [
        MeesQuestionnaireComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        RoutingModule,
        QuestionnaireModule,
    ],
})
export class MeesModule {
}
