import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {ResultsPageComponent} from "./results-page.component";
import {PotentialsComponent} from "./potentials/potentials.component";
import {RoutingModule} from "../app-routing.module";
import {SharedModule} from "../shared/shared.module";

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
    ]
})
export class ResultsPageModule {
}