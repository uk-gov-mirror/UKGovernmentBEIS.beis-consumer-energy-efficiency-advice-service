import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SharedModule} from '../shared/shared.module';
import {QuestionnaireModule} from '../questionnaire/questionnaire.module';
import {RoutingModule} from '../app-routing.module';
import {ECOSelfReferralStartPageComponent} from './eco-self-referral-start-page/eco-self-referral-start-page.component';
import {ECOSelfReferralQuestionnaireComponent} from './eco-self-referral-questionnaire/eco-self-referral-questionnaire.component';
import {ECOSelfReferralDonePageComponent} from './eco-self-referral-done-page/eco-self-referral-done-page.component';
import {ECOSelfReferralDonePageGuard} from "./eco-self-referral-done-page/eco-self-referral-done-page.guard";
import {ECOSelfReferralConsentGuard} from "./eco-self-referral-consent.guard";

@NgModule({
    declarations: [
        ECOSelfReferralStartPageComponent,
        ECOSelfReferralQuestionnaireComponent,
        ECOSelfReferralDonePageComponent
    ],
    exports: [
        ECOSelfReferralStartPageComponent,
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
                ECOSelfReferralDonePageGuard,
                ECOSelfReferralConsentGuard
            ]
        };
    }
}
