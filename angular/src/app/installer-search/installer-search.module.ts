import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import {RoutingModule} from '../app-routing.module';
import {InstallerSearchComponent} from "./installer-search.component";

@NgModule({
    declarations: [
        InstallerSearchComponent,
    ],
    exports: [
        InstallerSearchComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        RoutingModule,
    ]
})
export class InstallerSearchModule {
}
