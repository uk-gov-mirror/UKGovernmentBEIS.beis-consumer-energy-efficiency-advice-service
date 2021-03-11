import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {InlineSVGModule} from 'ng-inline-svg';
import {CookieService} from 'ng2-cookies';

import {TimesPipe} from './times/times.pipe';
import {QuestionContentService} from './question-content/question-content.service';
import {WordpressApiService} from './wordpress-api-service/wordpress-api-service';
import {ResponseData} from './response-data/response-data';
import {EnergyCalculationApiService} from './energy-calculation-api-service/energy-calculation-api-service';
import {NavigationBarComponent} from '../layout-components/navigation-bar/navigation-bar.component';
import {SearchBarComponent} from "../layout-components/search-bar/search-bar.component";
import {RoutingModule} from '../app-routing.module';
import {LatestNewsCardComponent} from './latest-news-card/latest-news-card.component';
import {RadialPercentageComponent} from './radial-percentage/radial-percentage.component';
import {SpinnerAndErrorContainerComponent} from './spinner-and-error-container/spinner-and-error-container.component';
import {NeedHelpComponent} from './need-help/need-help.component';
import {PostcodeEpcService} from './postcode-epc-service/postcode-epc.service';
import {PostcodeApiService} from './postcode-epc-service/postcode-api-service/postcode-api.service';
import {LocalAuthorityService} from './local-authority-service/local-authority.service';
import {RecommendationCardComponent} from './recommendation-card/recommendation-card.component';
import {EpcApiService} from './postcode-epc-service/epc-api-service/epc-api.service';
import {AbTestingService} from './analytics/ab-testing.service';
import {GoogleAnalyticsService} from './analytics/google-analytics.service';
import {EnergySavingMeasureContentService} from './energy-saving-measure-content-service/energy-saving-measure-content.service';
import {QuestionReasonComponent} from './question-reason/question-reason.component';
import {AssetsService} from './assets-service/assets.service';
import {PostcodeLookupComponent} from './postcode-lookup/postcode-lookup.component';
import {LargeVideoCardComponent} from './large-video-card/large-video-card.component';
import {SafePipe} from './safe/safe.pipe';
import {CeilPipe} from './ceil/ceil.pipe';
import {LocalGrantCardComponent} from './local-grant-card/local-grant-card.component';
import {NationalGrantsLinkCardComponent} from './national-grants-link-card/national-grants-link-card.component';
import {RecommendationsService} from './recommendations-service/recommendations.service';
import {GreenHomesGrantRecommendationsService} from './recommendations-service/green-homes-grant-recommendations.service';
import {StickyRowWrapperComponent} from './sticky-row-wrapper/sticky-row-wrapper.component';
import {DataCardComponent} from './data-card/data-card.component';
import {WordpressMeasuresService} from './wordpress-measures-service/wordpress-measures.service';
import {LatestNewsSectionComponent} from './latest-news-section/latest-news-section.component';
import {UserStateApiService} from './user-state-api-service/user-state-api-service';
import {UserStateService} from './user-state-service/user-state-service';
import {ForbiddenPageComponent} from './forbidden-page/forbidden-page.component';
import {NavBarSuboptionComponent} from '../layout-components/navigation-bar/nav-bar-suboption/nav-bar-suboption.component';
import {WordpressECOSuppliersService} from './wordpress-eco-suppliers-service/wordpress-eco-suppliers.service';
import {WordpressSearchService} from './wordpress-search-service/wordpress-search.service';
import {EpcLookupComponent} from './epc-lookup/epc-lookup.component';
import {ContentsTableComponent} from "./contents-table/contents-table.component";
import {PlanInfoService} from "./plan-info-service/plan-info.service";
import {EnergyEfficiencyDisplayService} from "./energy-efficiency-display-service/energy-efficiency-display.service";
import {LinkButtonComponent} from "./link-button/link-button.component";
import {AccordionComponent} from "../accordion/accordion.component";
import {ECOSelfReferralConsentData} from '../eco-self-referral/eco-self-referral-consent-data';
import {PageTitleService} from "./page-title-service/page-title.service";
import {InstallerSearchService} from "./installer-search-service/installer-search.service";
import {GreenHomesGrantService} from "../green-homes-grant/green-homes-grant-service/green-homes-grant.service";
import {RouterLinkButtonComponent} from "./router-link-button/router-link-button.component";

@NgModule({
    declarations: [
        PostcodeLookupComponent,
        EpcLookupComponent,
        TimesPipe,
        NavigationBarComponent,
        SearchBarComponent,
        NavBarSuboptionComponent,
        LatestNewsCardComponent,
        RadialPercentageComponent,
        SpinnerAndErrorContainerComponent,
        NeedHelpComponent,
        RecommendationCardComponent,
        QuestionReasonComponent,
        LargeVideoCardComponent,
        SafePipe,
        CeilPipe,
        LocalGrantCardComponent,
        NationalGrantsLinkCardComponent,
        StickyRowWrapperComponent,
        DataCardComponent,
        LatestNewsSectionComponent,
        ForbiddenPageComponent,
        ContentsTableComponent,
        LinkButtonComponent,
        AccordionComponent,
        RouterLinkButtonComponent
    ],
    exports: [
        PostcodeLookupComponent,
        EpcLookupComponent,
        TimesPipe,
        NavigationBarComponent,
        NavBarSuboptionComponent,
        SearchBarComponent,
        LatestNewsCardComponent,
        RadialPercentageComponent,
        SpinnerAndErrorContainerComponent,
        NeedHelpComponent,
        RecommendationCardComponent,
        QuestionReasonComponent,
        LargeVideoCardComponent,
        SafePipe,
        CeilPipe,
        LocalGrantCardComponent,
        NationalGrantsLinkCardComponent,
        StickyRowWrapperComponent,
        DataCardComponent,
        LatestNewsSectionComponent,
        ForbiddenPageComponent,
        ContentsTableComponent,
        LinkButtonComponent,
        AccordionComponent,
        RouterLinkButtonComponent
    ],
    imports: [
        HttpClientModule,
        RoutingModule,
        CommonModule,
        FormsModule,
        InlineSVGModule,
    ],
})
export class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule,
            providers: [
                QuestionContentService,
                WordpressApiService,
                WordpressSearchService,
                WordpressMeasuresService,
                WordpressECOSuppliersService,
                ResponseData,
                ECOSelfReferralConsentData,
                EnergyCalculationApiService,
                UserStateApiService,
                UserStateService,
                EpcApiService,
                PostcodeEpcService,
                PostcodeApiService,
                LocalAuthorityService,
                EnergySavingMeasureContentService,
                AbTestingService,
                GoogleAnalyticsService,
                AssetsService,
                RecommendationsService,
                GreenHomesGrantRecommendationsService,
                CookieService,
                PlanInfoService,
                EnergyEfficiencyDisplayService,
                PageTitleService,
                InstallerSearchService,
                GreenHomesGrantService
            ]
        };
    }
}
