import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

import {TimesPipe} from "./times/times.pipe";
import {QuestionContentService} from "./question-content/question-content.service";
import {WordpressApiService} from "./wordpress-api-service/wordpress-api-service";
import {ResponseData} from "./response-data/response-data";
import {FeatureFlagService} from "./feature-flag/feature-flag.service";
import {EnergyCalculationApiService} from "./energy-calculation-api-service/energy-calculation-api-service";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {NavigationBarComponent} from "./navigation-bar/navigation-bar.component";
import {RoutingModule} from "../app-routing.module";

@NgModule({
    declarations: [
        TimesPipe,
        HeaderComponent,
        FooterComponent,
        NavigationBarComponent
    ],
    exports: [
        TimesPipe,
        HeaderComponent,
        FooterComponent,
        NavigationBarComponent
    ],
    imports: [
        HttpClientModule,
        RoutingModule,
        CommonModule
    ],
})
export class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule,
            providers: [
                QuestionContentService,
                WordpressApiService,
                ResponseData,
                FeatureFlagService,
                EnergyCalculationApiService
            ]
        };
    }
}