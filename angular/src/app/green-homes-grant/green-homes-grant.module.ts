import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SharedModule} from '../shared/shared.module';
import {QuestionnaireModule} from '../questionnaire/questionnaire.module';
import {RoutingModule} from '../app-routing.module';
import {GrantEligibilityService} from "../grants/grant-eligibility-service/grant-eligibility.service";
import {NationalGrantsContentService} from "../grants/national-grants-content-service/national-grants-content.service";
import {NationalGrantCalculatorProvider} from "../grants/national-grant-calculator/provider/national-grant-calculator.provider";
import {IncomeThresholdService} from "../grants/national-grant-calculator/grants/eco-hhcro-help-to-heat/income-threshold-service/income-threshold.service";
import {NationalGrantCalculator} from "../grants/national-grant-calculator/national-grant-calculator";
import {EcoHhcroHelpToHeat} from "../grants/national-grant-calculator/grants/eco-hhcro-help-to-heat/eco-hhcro-help-to-heat";
import {GreenHomesGrantQuestionnaireComponent} from "./green-homes-grant-questionnaire/green-homes-grant-questionnaire.component";
import {GreenHomesGrantResultsPageComponent} from "./results-page/green-homes-grant-results-page.component";
import {GreenHomesGrantResultsPageGuard} from "./results-page/green-homes-grant-results-page.guard";

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
                GrantEligibilityService,
                NationalGrantsContentService,
                NationalGrantCalculatorProvider,
                GreenHomesGrantResultsPageGuard,
                IncomeThresholdService,
                {provide: NationalGrantCalculator, useClass: EcoHhcroHelpToHeat, multi: true},
            ]
        };
    }
}
