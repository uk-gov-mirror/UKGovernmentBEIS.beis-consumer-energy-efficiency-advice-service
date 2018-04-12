import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import {RoutingModule} from '../app-routing.module';
import {ECOSuppliersPageComponent} from './eco-suppliers-page.component';

@NgModule({
    declarations: [
        ECOSuppliersPageComponent,
    ],
    exports: [
        ECOSuppliersPageComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        RoutingModule,
    ]
})
export class ECOSuppliersPageModule {
}
