import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";

import {LandingPageComponent} from "./landing-page.component";
import {HomeImprovementsComponent} from "./home-improvements/home-improvements.component";
import {SharedModule} from "../shared/shared.module";
import {ArticleCardComponent} from "./article-card/article-card.component";
import {WarmerHomeComponent} from "./warmer-home/warmer-home.component";
import {ReduceBillsComponent} from "./reduce-bills/reduce-bills.component";
import {CarbonFootprintComponent} from "./carbon-footprint/carbon-footprint.component";

@NgModule({
    declarations: [
        LandingPageComponent,
        HomeImprovementsComponent,
        ArticleCardComponent,
        WarmerHomeComponent,
        ReduceBillsComponent,
        CarbonFootprintComponent,
    ],
    exports: [
        HomeImprovementsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ]
})
export class LandingPageModule {
}