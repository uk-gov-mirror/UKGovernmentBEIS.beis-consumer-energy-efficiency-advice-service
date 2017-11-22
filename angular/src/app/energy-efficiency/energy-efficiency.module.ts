import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {SharedModule} from "../shared/shared.module";
import {QuestionnaireModule} from "../questionnaire/questionnaire.module";
import {EnergyEfficiencyQuestionnaireGuard} from "./energy-efficiency-questionnaire/energy-efficiency-questionnaire.guard";
import {EnergyEfficiencyQuestionnaireComponent} from "./energy-efficiency-questionnaire/energy-efficiency-questionnaire.component";
import {EnergyEfficiencyResultsModule} from "./energy-efficiency-results/energy-efficiency-results.module";

@NgModule({
    declarations: [
        EnergyEfficiencyQuestionnaireComponent
    ],
    exports: [
        EnergyEfficiencyQuestionnaireComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        QuestionnaireModule,
        EnergyEfficiencyResultsModule
    ]
})
export class EnergyEfficiencyModule {
    static forRoot() {
        return {
            ngModule: EnergyEfficiencyModule,
            providers: [EnergyEfficiencyQuestionnaireGuard]
        };
    }
}