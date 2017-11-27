import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {RoutingModule} from "../../app-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {EnergyEfficiencyResultsComponent} from "./energy-efficiency-results.component";
import {EnergyEfficiencyRecommendationCardComponent} from "./energy-efficiency-recommendation-card/energy-efficiency-recommendation-card.component";
import {DataCardComponent} from "./data-card/data-card.component";
import {GrantsModule} from "../../grants/grants.module";
import {RecommendationFilterControlComponent} from "./recommendation-filter-control/recommendation-filter-control.component";

@NgModule({
    declarations: [
        EnergyEfficiencyResultsComponent,
        EnergyEfficiencyRecommendationCardComponent,
        DataCardComponent,
        RecommendationFilterControlComponent
    ],
    exports: [
        EnergyEfficiencyResultsComponent,
    ],
    imports: [
        CommonModule,
        RoutingModule,
        SharedModule,
        GrantsModule
    ]
})
export class EnergyEfficiencyResultsModule {
}