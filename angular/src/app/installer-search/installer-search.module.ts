import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InlineSVGModule} from 'ng-inline-svg';

import {SharedModule} from '../shared/shared.module';
import {RoutingModule} from '../app-routing.module';
import {InstallerSearchComponent} from "./installer-search.component";
import {FormsModule} from '@angular/forms';
import {InstallerSearchService} from "./installer-search-service/installer-search.service";
import {InstallerCardComponent} from "./installer-card/installer-card.component";
import {InstallerMapComponent} from "./installer-map/installer-map.component";

@NgModule({
    declarations: [
        InstallerSearchComponent,
        InstallerCardComponent,
        InstallerMapComponent
    ],
    exports: [
        InstallerSearchComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        RoutingModule,
        FormsModule,
        InlineSVGModule,
    ],
    providers: [
        InstallerSearchService,
    ]
})
export class InstallerSearchModule {
}
