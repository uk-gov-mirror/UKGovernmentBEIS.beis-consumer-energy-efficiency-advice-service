import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomePageComponent} from './home-page.component';
import {SharedModule} from '../shared/shared.module';
import {RoutingModule} from '../app-routing.module';
import {QuestionnaireModule} from '../questionnaire/questionnaire.module';
import {MeesPageModule} from "../mees-page/mees-page.module";

@NgModule({
    declarations: [
        HomePageComponent,
    ],
    exports: [
        HomePageComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        RoutingModule,
        QuestionnaireModule,
        MeesPageModule,
    ]
})
export class HomePageModule {
}
