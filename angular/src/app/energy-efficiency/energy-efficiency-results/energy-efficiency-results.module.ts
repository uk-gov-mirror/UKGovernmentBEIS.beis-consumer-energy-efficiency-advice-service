import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {PotentialsComponent} from "../../results-page/potentials/potentials.component";
import {RoutingModule} from "../../app-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {EnergyEfficiencyResultsComponent} from "./energy-efficiency-results.component";
import {EnergyEfficiencyRecommendationCardComponent} from "./energy-efficiency-recommendation-card/energy-efficiency-recommendation-card.component";
import {DataCardComponent} from "./data-card/data-card.component";

@NgModule({
    declarations: [
        EnergyEfficiencyResultsComponent,
        PotentialsComponent,
        EnergyEfficiencyRecommendationCardComponent,
        DataCardComponent
    ],
    exports: [
        EnergyEfficiencyResultsComponent,
    ],
    imports: [
        CommonModule,
        RoutingModule,
        SharedModule,
    ]
})
export class EnergyEfficiencyResultsModule {
}