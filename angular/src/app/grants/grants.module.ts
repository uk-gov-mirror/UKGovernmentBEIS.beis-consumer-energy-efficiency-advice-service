import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {SharedModule} from "../shared/shared.module";
import {GrantsQuestionnaireComponent} from "./grants-questionnaire/grants-questionnaire.component";
import {QuestionnaireModule} from "../questionnaire/questionnaire.module";
import {GrantsLandingPageComponent} from "./landing-page/grants-landing-page.component";
import {RoutingModule} from "../app-routing.module";
import {GrantEligibilityService} from "./grant-eligibility-service/grant-eligibility.service";
import {NationalGrantsContentService} from "./national-grants-content-service/national-grants-content.service";
import {NationalGrantCalculatorFactory} from "./national-grant-calculator/national-grant-calculator-factory";
import {GrantCardComponent} from "./grant-card/grant-card.component";

@NgModule({
    declarations: [
        GrantsQuestionnaireComponent,
        GrantsLandingPageComponent,
        GrantCardComponent
    ],
    exports: [
        GrantsQuestionnaireComponent,
        GrantsLandingPageComponent,
        GrantCardComponent
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
    static forRoot() {
        return {
            ngModule: SharedModule,
            providers: [
                GrantEligibilityService,
                NationalGrantsContentService,
                NationalGrantCalculatorFactory
            ]
        };
    }
}