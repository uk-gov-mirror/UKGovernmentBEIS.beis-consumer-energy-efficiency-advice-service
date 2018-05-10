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
import {RoutingModule} from '../app-routing.module';
import {RecommendationStepCardComponent} from './your-plan-page/recommendation-step-card/recommendation-step-card.component';
import {DownloadPlanComponent} from './your-plan-page/download-plan/download-plan.component';
import {BreakEvenComponent} from './energy-efficiency-results/break-even/break-even.component';
import {YourPlanFooterComponent} from './energy-efficiency-results/your-plan-footer/your-plan-footer.component';

@NgModule({
    declarations: [
        EnergyEfficiencyQuestionnaireComponent,
        YourPlanPageComponent,
        YourPlanSummaryComponent,
        EnergyEfficiencyResultsComponent,
        EnergyEfficiencyRecommendationCardComponent,
        YourPlanFooterComponent,
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
