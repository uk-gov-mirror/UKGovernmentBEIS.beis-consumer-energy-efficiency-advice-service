import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InlineSVGModule} from 'ng-inline-svg';

import {SharedModule} from '../shared/shared.module';
import {RoutingModule} from '../app-routing.module';
import {MeasurePageComponent} from './measure-page.component';

@NgModule({
    declarations: [
        MeasurePageComponent,
    ],
    exports: [
        MeasurePageComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        RoutingModule,
        InlineSVGModule
    ]
})
export class MeasurePageModule {
}
