import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import {RoutingModule} from '../app-routing.module';
import {SuppliersPageComponent} from './suppliers-page.component';

@NgModule({
    declarations: [
        SuppliersPageComponent,
    ],
    exports: [
        SuppliersPageComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        RoutingModule,
    ]
})
export class SuppliersPageModule {
}
