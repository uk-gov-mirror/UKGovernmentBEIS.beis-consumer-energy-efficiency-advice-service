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
import {RadialPercentageComponent} from "./radial-percentage/radial-percentage.component";
import {SpinnerAndErrorContainerComponent} from "./spinner-and-error-container/spinner-and-error-container.component";
import {NeedHelpComponent} from "./need-help/need-help.component";
import {PostcodeEpcService} from "./postcode-epc-service/postcode-epc.service";
import {PostcodeApiService} from "./postcode-epc-service/postcode-api-service/postcode-api.service";
import {LocalAuthorityService} from "./local-authority-service/local-authority.service";
import {RecommendationCardComponent} from "./recommendation-card/recommendation-card.component";
import {EpcApiService} from "./postcode-epc-service/epc-api-service/epc-api.service";
import {GoogleAnalyticsService} from "./analytics/google-analytics.service";
import {EnergySavingMeasureContentService} from "./energy-saving-measure-content-service/energy-saving-measure-content.service";
import {QuestionReasonComponent} from "./question-reason/question-reason.component";
import {AssetsService} from "./assets-service/assets.service";
import {PostcodeLookupComponent} from "./postcode-lookup/postcode-lookup.component";
import {LargeVideoCardComponent} from "./large-video-card/large-video-card.component";
import {GrantCardComponent} from "./grant-card/grant-card.component";
import {RecommendationsService} from "./recommendations-service/recommendations.service";
import {StickyRowWrapperComponent} from "./sticky-row-wrapper/sticky-row-wrapper.component";

@NgModule({
    declarations: [
        PostcodeLookupComponent,
        TimesPipe,
        NavigationBarComponent,
        LatestNewsCardComponent,
        RadialPercentageComponent,
        SpinnerAndErrorContainerComponent,
        NeedHelpComponent,
        RecommendationCardComponent,
        QuestionReasonComponent,
        LargeVideoCardComponent,
        GrantCardComponent,
        StickyRowWrapperComponent
    ],
    exports: [
        PostcodeLookupComponent,
        TimesPipe,
        NavigationBarComponent,
        LatestNewsCardComponent,
        RadialPercentageComponent,
        SpinnerAndErrorContainerComponent,
        NeedHelpComponent,
        RecommendationCardComponent,
        QuestionReasonComponent,
        LargeVideoCardComponent,
        GrantCardComponent,
        StickyRowWrapperComponent
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
                EpcApiService,
                PostcodeEpcService,
                PostcodeApiService,
                LocalAuthorityService,
                EnergySavingMeasureContentService,
                GoogleAnalyticsService,
                AssetsService,
                RecommendationsService
            ]
        };
    }
}