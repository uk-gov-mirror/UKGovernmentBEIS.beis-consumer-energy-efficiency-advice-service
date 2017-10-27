import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ResultsPageComponent} from './results-page.component';
import {FurtherQuestionsLinkComponent} from './further-questions-link/further-questions-link.component';
import {GrantCardComponent} from './grant-card/grant-card.component';
import {PotentialsComponent} from './potentials/potentials.component';
import {RecommendationCardComponent} from './recommendation-card/recommendation-card.component';
import {SuggestionCardComponent} from './suggestion-card/suggestion-card.component';

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
        CommonModule
    ]
})
export class ResultsPageModule {
}