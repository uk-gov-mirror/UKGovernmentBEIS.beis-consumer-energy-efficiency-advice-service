import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InlineSVGModule} from 'ng-inline-svg';

import {SharedModule} from '../shared/shared.module';
import {QuestionnaireModule} from '../questionnaire/questionnaire.module';
import {EnergyEfficiencyQuestionnaireComponent} from './energy-efficiency-questionnaire/energy-efficiency-questionnaire.component';
import {YourPlanPageComponent} from './your-plan-page/your-plan-page.component';
import {YourPlanSummaryComponent} from './your-plan-summary/your-plan-summary.component';
import {EnergyEfficiencyResultsComponent} from './energy-efficiency-results/energy-efficiency-results.component';
import {EnergyEfficiencyRecommendationCardComponent} from './energy-efficiency-results/energy-efficiency-recommendation-card/energy-efficiency-recommendation-card.component';
import {EnergyEfficiencyCombinedRecommendationCardComponent} from './energy-efficiency-results/energy-efficiency-combined-recommendation-card/energy-efficiency-combined-recommendation-card.component';
import {RoutingModule} from '../app-routing.module';
import {RecommendationStepCardComponent} from './your-plan-page/recommendation-step-card/recommendation-step-card.component';
import {DownloadPlanComponent} from './your-plan-page/download-plan/download-plan.component';
import {BreakEvenComponent} from './energy-efficiency-results/break-even/break-even.component';
import {YourPlanFooterComponent} from './energy-efficiency-results/your-plan-footer/your-plan-footer.component';
import {FormsModule} from "@angular/forms";
import {DownloadPdfButtonComponent} from "./your-plan-page/download-pdf-button/download-pdf-button.component";
import {RecommendationWithStepsCardComponent} from "./your-plan-page/recommendation-with-steps-card/recommendation-with-steps-card.component";
import {YourPlanFooterItemComponent} from "./energy-efficiency-results/your-plan-footer/your-plan-footer-item/your-plan-footer-item.component";
import {YourPlanFooterCombinedItemComponent} from "./energy-efficiency-results/your-plan-footer/your-plan-footer-combined-item/your-plan-footer-combined-item.component";

@NgModule({
    declarations: [
        EnergyEfficiencyQuestionnaireComponent,
        YourPlanPageComponent,
        YourPlanSummaryComponent,
        EnergyEfficiencyResultsComponent,
        EnergyEfficiencyRecommendationCardComponent,
        EnergyEfficiencyCombinedRecommendationCardComponent,
        YourPlanFooterComponent,
        YourPlanFooterItemComponent,
        YourPlanFooterCombinedItemComponent,
        RecommendationStepCardComponent,
        RecommendationWithStepsCardComponent,
        DownloadPlanComponent,
        DownloadPdfButtonComponent,
        BreakEvenComponent
    ],
    exports: [
        EnergyEfficiencyQuestionnaireComponent,
        YourPlanPageComponent,
        EnergyEfficiencyResultsComponent,
        EnergyEfficiencyCombinedRecommendationCardComponent,
        DownloadPdfButtonComponent
    ],
    imports: [
        FormsModule,
        SharedModule,
        CommonModule,
        QuestionnaireModule,
        RoutingModule,
        InlineSVGModule
    ]
})
export class EnergyEfficiencyModule {
    static forRoot() {
        return {
            ngModule: EnergyEfficiencyModule,
        };
    }
}
