import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SharedModule} from '../shared/shared.module';
import {QuestionnaireModule} from '../questionnaire/questionnaire.module';
import {RoutingModule} from '../app-routing.module';
import {ECOSelfReferralQuestionnaireComponent} from './eco-self-referral-questionnaire/eco-self-referral-questionnaire.component';
import {ECOSelfReferralDonePageComponent} from './eco-self-referral-done-page/eco-self-referral-done-page.component';

@NgModule({
    declarations: [
        ECOSelfReferralQuestionnaireComponent,
        ECOSelfReferralDonePageComponent
    ],
    exports: [
        ECOSelfReferralQuestionnaireComponent,
        ECOSelfReferralDonePageComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        QuestionnaireModule,
        FormsModule,
        RoutingModule
    ]
})
export class ECOSelfReferralModule {
    static forRoot() {
        return {
            ngModule: ECOSelfReferralModule,
            providers: [
            ]
        };
    }
}
