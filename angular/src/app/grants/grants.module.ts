import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {SharedModule} from "../shared/shared.module";
import {GrantsQuestionnaireComponent} from "./grants-questionnaire/grants-questionnaire.component";
import {QuestionnaireModule} from "../questionnaire/questionnaire.module";

@NgModule({
    declarations: [
        GrantsQuestionnaireComponent
    ],
    exports: [
        GrantsQuestionnaireComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        QuestionnaireModule
    ]
})
export class GrantsModule {
}