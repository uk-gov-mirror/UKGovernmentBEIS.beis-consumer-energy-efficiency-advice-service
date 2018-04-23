import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {HomeImprovementsComponent} from './home-improvements.component';
import {LargeVideoCardComponent} from '../../shared/large-video-card/large-video-card.component';
import {LatestNewsCardComponent} from '../../shared/latest-news-card/latest-news-card.component';
import {ArticleCardComponent} from '../article-card/article-card.component';
import {LandingPageComponent} from '../landing-page.component';
import {NavigationBarComponent} from '../../layout-components/navigation-bar/navigation-bar.component';
import {ResponseData} from '../../shared/response-data/response-data';
import {PostcodeLookupComponent} from '../../shared/postcode-lookup/postcode-lookup.component';
import {EpcParserService} from '../../shared/postcode-epc-service/epc-api-service/epc-parser.service';
import {QuestionContentService} from '../../shared/question-content/question-content.service';
import {PostcodeDetails} from '../../shared/postcode-epc-service/model/postcode-details';
import {PostcodeEpcService} from '../../shared/postcode-epc-service/postcode-epc.service';
import {WordpressPagesService} from '../../shared/wordpress-pages-service/wordpress-pages.service';
import {InlineSVGModule} from 'ng-inline-svg';
import {DataCardComponent} from '../../shared/data-card/data-card.component';
import {PostcodeApiService} from "../../shared/postcode-epc-service/postcode-api-service/postcode-api.service";
import {PostcodeBasicDetailsResponse} from '../../shared/postcode-epc-service/model/response/postcode-basic-details-response';
import {PopupComponent} from '../../shared/popup/popup.component';
import {LatestNewsSectionComponent} from '../../shared/latest-news-section/latest-news-section.component';
import {SearchBarComponent} from "../../layout-components/search-bar/search-bar.component";
import {NavBarSuboptionComponent} from "../../layout-components/navigation-bar/nav-bar-suboption/nav-bar-suboption.component";
import {GoogleAnalyticsService} from "../../shared/analytics/google-analytics.service";
import {MeasureCardComponent} from "../measure-card/measure-card.component";
import {EnergySavingMeasureContentService} from "../../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";

describe('HomeImprovementsComponent', () => {
    let component: HomeImprovementsComponent;
    let fixture: ComponentFixture<HomeImprovementsComponent>;

    const dummyEpcsResponse = require('assets/test/dummy-epcs-response.json');
    const dummyPostcodeDetails: PostcodeDetails = {
        postcode: 'dummy',
        allEpcsForPostcode: EpcParserService.parse(dummyEpcsResponse),
        localAuthorityCode: null
    };
    const postcodeEpcServiceStub = {
        fetchPostcodeDetails: (postcode) => Observable.of(dummyPostcodeDetails)
    };

    const dummyPostcodeResponse = require('assets/test/dummy-postcode-response.json');
    const dummyBasicPostcodeDetails: PostcodeBasicDetailsResponse = dummyPostcodeResponse;

    const postcodeApiServiceStub = {
        fetchBasicPostcodeDetails: (postcode) => Observable.of(dummyBasicPostcodeDetails)
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeImprovementsComponent,
                LandingPageComponent,
                NavigationBarComponent,
                LargeVideoCardComponent,
                ArticleCardComponent,
                LatestNewsSectionComponent,
                LatestNewsCardComponent,
                PostcodeLookupComponent,
                DataCardComponent,
                PopupComponent,
                SearchBarComponent,
                NavBarSuboptionComponent,
                MeasureCardComponent
            ],
            imports: [
                CommonModule,
                FormsModule,
                RouterTestingModule,
                InlineSVGModule
            ],
            providers: [
                ResponseData,
                {provide: QuestionContentService, useValue: {fetchQuestionsContent: () => Observable.throw('error')}},
                {provide: PostcodeEpcService, useValue: postcodeEpcServiceStub},
                {provide: WordpressPagesService, useValue: {getLatestPages: () => Observable.of([])}},
                {provide: PostcodeApiService, useValue: postcodeApiServiceStub},
                {provide: EnergySavingMeasureContentService, useValue: {
                    'fetchMeasureDetailsForLandingPage': (() => Observable.of([]))
                }},
                GoogleAnalyticsService,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeImprovementsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
