import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import {RoutingModule} from '../app-routing.module';
import {InstallerSearchComponent} from "./installer-search.component";
import { FormsModule } from '@angular/forms';

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
        FormsModule,
    ]
})
export class InstallerSearchModule {
}
