import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InlineSVGModule} from 'ng-inline-svg';

import {SharedModule} from "../shared/shared.module";
import {RoutingModule} from "../app-routing.module";
import {SimpleSavingsComponent} from './simple-savings.component';

@NgModule({
    declarations: [
        SimpleSavingsComponent
    ],
    exports: [
        SimpleSavingsComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        RoutingModule,
        InlineSVGModule
    ],
})
export class SimpleSavingsModule {
}
