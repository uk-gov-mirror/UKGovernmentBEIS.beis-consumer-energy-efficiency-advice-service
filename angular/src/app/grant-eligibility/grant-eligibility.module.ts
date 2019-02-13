import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SharedModule} from '../shared/shared.module';
import {QuestionnaireModule} from '../questionnaire/questionnaire.module';
import {RoutingModule} from '../app-routing.module';
import {GrantEligibilityQuestionnaireComponent} from "./grant-eligibility-questionnaire/grant-eligibility-questionnaire.component";
import {GrantEligibilityService} from "../grants/grant-eligibility-service/grant-eligibility.service";
import {NationalGrantsContentService} from "../grants/national-grants-content-service/national-grants-content.service";
import {NationalGrantCalculatorProvider} from "../grants/national-grant-calculator/provider/national-grant-calculator.provider";
import {IncomeThresholdService} from "../grants/national-grant-calculator/grants/eco-hhcro-help-to-heat/income-threshold-service/income-threshold.service";
import {NationalGrantCalculator} from "../grants/national-grant-calculator/national-grant-calculator";
import {EcoHhcroHelpToHeat} from "../grants/national-grant-calculator/grants/eco-hhcro-help-to-heat/eco-hhcro-help-to-heat";
import {GrantEligibilityResultsPageComponent} from "./results-page/grant-eligibility-results-page.component";
import {GrantEligibilityResultsPageGuard} from "./results-page/grant-eligibility-results-page.guard";

@NgModule({
    declarations: [
        GrantEligibilityQuestionnaireComponent,
        GrantEligibilityResultsPageComponent
    ],
    exports: [
        GrantEligibilityQuestionnaireComponent,
        GrantEligibilityResultsPageComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        QuestionnaireModule,
        FormsModule,
        RoutingModule
    ]
})
export class GrantEligibilityModule {
    static forRoot() {
        return {
            ngModule: GrantEligibilityModule,
            providers: [
                GrantEligibilityService,
                NationalGrantsContentService,
                NationalGrantCalculatorProvider,
                GrantEligibilityResultsPageGuard,
                IncomeThresholdService,
                {provide: NationalGrantCalculator, useClass: EcoHhcroHelpToHeat, multi: true},
            ]
        };
    }
}
