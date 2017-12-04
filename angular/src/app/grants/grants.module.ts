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
import {IncomeThresholdService} from "./national-grant-calculator/grants/eco-hhcro-help-to-heat/income-threshold-service/income-threshold.service";
import {ColdWeatherPayments} from "./national-grant-calculator/grants/cold-weather-payments/cold-weather-payments";
import {EcoHhcroFlex} from "./national-grant-calculator/grants/eco-hhcro-flex/eco-hccro-flex";
import {EcoCero} from "./national-grant-calculator/grants/eco-cero/eco-cero";
import {EcoHhcroSocialEfg} from "./national-grant-calculator/grants/eco-hhcro-social-efg/eco-hhcro-social-efg";
import {WarmHomeDiscount} from "./national-grant-calculator/grants/warm-home-discount/warm-home-discount";
import {EcoHhcroHelpToHeat} from "./national-grant-calculator/grants/eco-hhcro-help-to-heat/eco-hhcro-help-to-heat";
import {WinterFuelPayments} from "./national-grant-calculator/grants/winter-fuel-payments/winter-fuel-payments";
import {NationalGrantCalculator} from "./national-grant-calculator/national-grant-calculator";
import {NationalGrantCalculatorProvider} from "./national-grant-calculator/provider/national-grant-calculator.provider";

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
    static forRoot() {
        return {
            ngModule: GrantsModule,
            providers: [
                GrantEligibilityService,
                NationalGrantsContentService,
                NationalGrantCalculatorProvider,
                IncomeThresholdService,
                {provide: NationalGrantCalculator, useClass: ColdWeatherPayments, multi: true},
                {provide: NationalGrantCalculator, useClass: EcoCero, multi: true},
                {provide: NationalGrantCalculator, useClass: EcoHhcroFlex, multi: true},
                {provide: NationalGrantCalculator, useClass: EcoHhcroHelpToHeat, multi: true},
                {provide: NationalGrantCalculator, useClass: EcoHhcroSocialEfg, multi: true},
                {provide: NationalGrantCalculator, useClass: WarmHomeDiscount, multi: true},
                {provide: NationalGrantCalculator, useClass: WinterFuelPayments, multi: true},
            ]
        };
    }
}