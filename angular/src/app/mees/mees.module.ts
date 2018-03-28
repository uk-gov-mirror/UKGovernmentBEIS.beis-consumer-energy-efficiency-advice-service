import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {RoutingModule} from '../app-routing.module';
import {QuestionnaireModule} from '../questionnaire/questionnaire.module';
import {FormsModule} from '@angular/forms';
import {MeesQuestionnaireComponent} from './mees-questionnaire/mees-questionnaire.component';
import {MeesResultsPageComponent} from './results-page/mees-results-page.component';
import {MeesResultsPageRouteGuard} from './results-page/mees-results-page.guard';

@NgModule({
    declarations: [
        MeesQuestionnaireComponent,
        MeesResultsPageComponent,
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
    ],
})
export class MeesModule {
    static forRoot() {
        return {
            ngModule: MeesModule,
            providers: [
                MeesResultsPageRouteGuard,
            ]
        };
    }
}
