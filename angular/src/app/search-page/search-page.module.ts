import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InlineSVGModule} from 'ng-inline-svg';

import {SharedModule} from '../shared/shared.module';
import {RoutingModule} from '../app-routing.module';
import {SearchPageComponent} from './search-page.component';

@NgModule({
    declarations: [
        SearchPageComponent,
    ],
    exports: [
        SearchPageComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        RoutingModule,
        InlineSVGModule
    ]
})
export class SearchPageModule {
}
