import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {ResultsPageComponent} from "./results-page.component";
import {GrantCardComponent} from "./grant-card/grant-card.component";
import {PotentialsComponent} from "./potentials/potentials.component";
import {RecommendationCardComponent} from "./recommendation-card/recommendation-card.component";
import {LocalAuthorityService} from "./local-authority-service/local-authority.service";
import {RoutingModule} from "../app-routing.module";
import {SharedModule} from "../shared/shared.module";
import {RecommendationService} from "./recommendation-service/recommendation.service";

@NgModule({
    declarations: [
        ResultsPageComponent,
        GrantCardComponent,
        PotentialsComponent,
        RecommendationCardComponent,
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
    static forRoot() {
        return {
            ngModule: ResultsPageModule,
            providers: [
                LocalAuthorityService,
                RecommendationService,
            ]
        };
    }
}