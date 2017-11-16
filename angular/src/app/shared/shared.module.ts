import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

import {TimesPipe} from "./times/times.pipe";
import {QuestionContentService} from "./question-content/question-content.service";
import {WordpressApiService} from "./wordpress-api-service/wordpress-api-service";
import {ResponseData} from "./response-data/response-data";
import {FeatureFlagService} from "./feature-flag/feature-flag.service";
import {EnergyCalculationApiService} from "./energy-calculation-api-service/energy-calculation-api-service";
import {NavigationBarComponent} from "../layout-components/navigation-bar/navigation-bar.component";
import {RoutingModule} from "../app-routing.module";
import {LatestNewsCardComponent} from "./latest-news-card/latest-news-card.component";
import {PostcodeValidationService} from "./postcode-validation-service/postcode-validation.service";
import {RadialPercentageComponent} from "./radial-percentage/radial-percentage.component";
import {SpinnerAndErrorContainerComponent} from "./spinner-and-error-container/spinner-and-error-container.component";
import {NeedHelpComponent} from "./need-help/need-help.component";
import {EpcApiService} from "./epc-api-service/epc-api.service";
import {RecommendationCardComponent} from "./recommendation-card/recommendation-card.component";
import {RecommendationService} from "./recommendation-service/recommendation.service";

@NgModule({
    declarations: [
        TimesPipe,
        NavigationBarComponent,
        LatestNewsCardComponent,
        RadialPercentageComponent,
        SpinnerAndErrorContainerComponent,
        NeedHelpComponent,
        RecommendationCardComponent,
    ],
    exports: [
        TimesPipe,
        NavigationBarComponent,
        LatestNewsCardComponent,
        RadialPercentageComponent,
        SpinnerAndErrorContainerComponent,
        NeedHelpComponent,
        RecommendationCardComponent,
    ],
    imports: [
        HttpClientModule,
        RoutingModule,
        CommonModule,
        FormsModule
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
                EnergyCalculationApiService,
                PostcodeValidationService,
                EpcApiService,
                RecommendationService,
            ]
        };
    }
}