import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {ResultsPageComponent} from "./results-page.component";
import {FurtherQuestionsLinkComponent} from "./further-questions-link/further-questions-link.component";
import {GrantCardComponent} from "./grant-card/grant-card.component";
import {PotentialsComponent} from "./potentials/potentials.component";
import {RecommendationCardComponent} from "./recommendation-card/recommendation-card.component";
import {SuggestionCardComponent} from "./suggestion-card/suggestion-card.component";
import {EnergyCalculationApiService} from "../common/energy-calculation-api-service/energy-calculation-api-service";
import {LocalAuthorityService} from "./local-authority-service/local-authority.service";

@NgModule({
    declarations: [
        ResultsPageComponent,
        FurtherQuestionsLinkComponent,
        GrantCardComponent,
        PotentialsComponent,
        RecommendationCardComponent,
        SuggestionCardComponent,
    ],
    exports: [
        ResultsPageComponent,
    ],
    imports: [
        BrowserModule,
    ],
    providers: [
        EnergyCalculationApiService,
        LocalAuthorityService
    ]
})
export class ResultsPageModule {
}