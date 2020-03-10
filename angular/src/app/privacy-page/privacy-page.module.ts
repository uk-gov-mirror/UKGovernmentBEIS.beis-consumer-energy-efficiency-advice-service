import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InlineSVGModule} from 'ng-inline-svg';

import {SharedModule} from '../shared/shared.module';
import {RoutingModule} from '../app-routing.module';
import {PrivacyPageComponent} from './privacy-page.component';

@NgModule({
    declarations: [
        PrivacyPageComponent
    ],
    exports: [
        PrivacyPageComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        RoutingModule,
        InlineSVGModule
    ]
})
export class PrivacyPageModule {
}
