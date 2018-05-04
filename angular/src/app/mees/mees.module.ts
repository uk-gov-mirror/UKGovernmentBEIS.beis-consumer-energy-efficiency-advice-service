import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {RoutingModule} from '../app-routing.module';
import {QuestionnaireModule} from '../questionnaire/questionnaire.module';
import {FormsModule} from '@angular/forms';
import {MeesQuestionnaireComponent} from './mees-questionnaire/mees-questionnaire.component';
import {MeesResultsPageComponent} from './results-page/mees-results-page.component';
import {MeesExemptionPageComponent} from './exemption-page/mees-exemption-page.component';

@NgModule({
    declarations: [
        MeesQuestionnaireComponent,
        MeesResultsPageComponent,
        MeesExemptionPageComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        RoutingModule,
        QuestionnaireModule,
    ],
    exports: [
        MeesQuestionnaireComponent,
        MeesResultsPageComponent,
        MeesExemptionPageComponent,
    ],
})
export class MeesModule {
    static forRoot() {
        return {
            ngModule: MeesModule,
        };
    }
}
