import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {SharedModule} from "../shared/shared.module";
import {QuestionnaireModule} from "../questionnaire/questionnaire.module";
import {EnergyEfficiencyQuestionnaireGuard} from "./energy-efficiency-questionnaire/energy-efficiency-questionnaire.guard";
import {EnergyEfficiencyQuestionnaireComponent} from "./energy-efficiency-questionnaire/energy-efficiency-questionnaire.component";
import {YourPlanPageComponent} from "./your-plan-page/your-plan-page.component";
import {YourPlanPageGuard} from "./your-plan-page/your-plan-page.guard";
import {YourPlanSummaryComponent} from "./your-plan-summary/your-plan-summary.component";
import {DataCardComponent} from "./data-card/data-card.component";
import {EnergyEfficiencyResultsComponent} from "./energy-efficiency-results/energy-efficiency-results.component";
import {EnergyEfficiencyRecommendationCardComponent} from "./energy-efficiency-results/energy-efficiency-recommendation-card/energy-efficiency-recommendation-card.component";
import {RecommendationFilterControlComponent} from "./energy-efficiency-results/recommendation-filter-control/recommendation-filter-control.component";
import {ResultsPageYourPlanComponent} from "./energy-efficiency-results/results-page-your-plan/results-page-your-plan.component";
import {RoutingModule} from "../app-routing.module";
import {RecommendationStepCardComponent} from "./your-plan-page/recommendation-step-card/recommendation-step-card.component";
import {DownloadPlanComponent} from "./your-plan-page/download-plan/download-plan.component";
import {BreakEvenComponent} from "./energy-efficiency-results/break-even/break-even.component";

@NgModule({
    declarations: [
        EnergyEfficiencyQuestionnaireComponent,
        YourPlanPageComponent,
        YourPlanSummaryComponent,
        DataCardComponent,
        EnergyEfficiencyResultsComponent,
        EnergyEfficiencyRecommendationCardComponent,
        RecommendationFilterControlComponent,
        ResultsPageYourPlanComponent,
        RecommendationStepCardComponent,
        DownloadPlanComponent,
        BreakEvenComponent
    ],
    exports: [
        EnergyEfficiencyQuestionnaireComponent,
        YourPlanPageComponent,
        EnergyEfficiencyResultsComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        QuestionnaireModule,
        RoutingModule
    ]
})
export class EnergyEfficiencyModule {
    static forRoot() {
        return {
            ngModule: EnergyEfficiencyModule,
            providers: [EnergyEfficiencyQuestionnaireGuard, YourPlanPageGuard]
        };
    }
}