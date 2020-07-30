import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SharedModule} from '../shared/shared.module';
import {QuestionnaireModule} from '../questionnaire/questionnaire.module';
import {RoutingModule} from '../app-routing.module';
import {GrantEligibilityService} from "../grants/grant-eligibility-service/grant-eligibility.service";
import {GreenHomesGrantQuestionnaireComponent} from "./green-homes-grant-questionnaire/green-homes-grant-questionnaire.component";
import {GreenHomesGrantResultsPageComponent} from "./results-page/green-homes-grant-results-page.component";
import {GreenHomesGrantResultsPageGuard} from "./results-page/green-homes-grant-results-page.guard";
import {GreenHomesGrantService} from "./green-homes-grant-service/green-homes-grant.service";

@NgModule({
    declarations: [
        GreenHomesGrantQuestionnaireComponent,
        GreenHomesGrantResultsPageComponent
    ],
    exports: [
        GreenHomesGrantQuestionnaireComponent,
        GreenHomesGrantResultsPageComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        QuestionnaireModule,
        FormsModule,
        RoutingModule
    ]
})
export class GreenHomesGrantModule {
    static forRoot() {
        return {
            ngModule: GreenHomesGrantModule,
            providers: [
                GreenHomesGrantResultsPageGuard,
                GreenHomesGrantService
            ]
        };
    }
}
