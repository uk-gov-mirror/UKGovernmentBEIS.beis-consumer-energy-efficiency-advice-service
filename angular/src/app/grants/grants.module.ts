import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {SharedModule} from "../shared/shared.module";
import {GrantsQuestionnaireComponent} from "./grants-questionnaire/grants-questionnaire.component";
import {QuestionnaireModule} from "../questionnaire/questionnaire.module";
import {GrantsLandingPageComponent} from "./landing-page/grants-landing-page.component";
import {RoutingModule} from "../app-routing.module";

@NgModule({
    declarations: [
        GrantsQuestionnaireComponent,
        GrantsLandingPageComponent
    ],
    exports: [
        GrantsQuestionnaireComponent,
        GrantsLandingPageComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        QuestionnaireModule,
        FormsModule,
        RoutingModule
    ]
})
export class GrantsModule {
}