import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {ResultsPageComponent} from "./results-page.component";
import {PotentialsComponent} from "./potentials/potentials.component";
import {RoutingModule} from "../app-routing.module";
import {SharedModule} from "../shared/shared.module";
import {GrantsModule} from "../grants/grants.module";

@NgModule({
    declarations: [
        ResultsPageComponent,
        PotentialsComponent,
    ],
    exports: [
        ResultsPageComponent,
    ],
    imports: [
        CommonModule,
        RoutingModule,
        SharedModule,
        GrantsModule
    ]
})
export class ResultsPageModule {
}