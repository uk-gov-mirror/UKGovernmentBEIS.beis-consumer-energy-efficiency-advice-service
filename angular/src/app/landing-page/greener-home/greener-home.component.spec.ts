import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {GreenerHomeComponent} from './greener-home.component';
import {LargeVideoCardComponent} from '../../shared/large-video-card/large-video-card.component';
import {ArticleCardComponent} from '../article-card/article-card.component';
import {LatestNewsCardComponent} from '../../shared/latest-news-card/latest-news-card.component';
import {LandingPageComponent} from '../landing-page.component';
import {NavigationBarComponent} from '../../layout-components/navigation-bar/navigation-bar.component';
import {ResponseData} from '../../shared/response-data/response-data';
import {QuestionContentService} from '../../shared/question-content/question-content.service';
import {PostcodeLookupComponent} from '../../shared/postcode-lookup/postcode-lookup.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PostcodeEpcService} from '../../shared/postcode-epc-service/postcode-epc.service';
import {PostcodeApiService} from "../../shared/postcode-epc-service/postcode-api-service/postcode-api.service";
import {WordpressPagesService} from '../../shared/wordpress-pages-service/wordpress-pages.service';
import {StaticMeasureCardComponent} from '../static-measure-card/static-measure-card.component';
import {DataCardComponent} from '../../shared/data-card/data-card.component';
import { PopupComponent } from '../../shared/popup/popup.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {LatestNewsSectionComponent} from '../../shared/latest-news-section/latest-news-section.component';
import {SearchBarComponent} from "../../layout-components/search-bar/search-bar.component";
import {NavBarSuboptionComponent} from "../../layout-components/navigation-bar/nav-bar-suboption/nav-bar-suboption.component";
import {GoogleAnalyticsService} from "../../shared/analytics/google-analytics.service";
import {SpinnerAndErrorContainerComponent} from "../../shared/spinner-and-error-container/spinner-and-error-container.component";

describe('GreenerHomeComponent', () => {

    let component: GreenerHomeComponent;
    let fixture: ComponentFixture<GreenerHomeComponent>;

    const postcodeEpcServiceStub = {
        fetchPostcodeDetails: (postcode) => Observable.of(null)
    };

    const postcodeApiServiceStub = {
        fetchBasicPostcodeDetails: (postcode) => Observable.of(null)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                GreenerHomeComponent,
                LandingPageComponent,
                NavigationBarComponent,
                LargeVideoCardComponent,
                ArticleCardComponent,
                LatestNewsSectionComponent,
                LatestNewsCardComponent,
                PostcodeLookupComponent,
                StaticMeasureCardComponent,
                DataCardComponent,
                PopupComponent,
                NavBarSuboptionComponent,
                SearchBarComponent,
                SpinnerAndErrorContainerComponent
            ],
            imports: [
                CommonModule,
                FormsModule,
                RouterTestingModule,
                HttpClientTestingModule,
                InlineSVGModule
            ],
            providers: [
                ResponseData,
                {provide: QuestionContentService, useValue: {fetchQuestionsContent: () => Observable.throw('error')}},
                {provide: PostcodeEpcService, useValue: postcodeEpcServiceStub},
                {provide: WordpressPagesService, useValue: {getLatestPages: () => Observable.of([])}},
                {provide: PostcodeApiService, useValue: postcodeApiServiceStub},
                GoogleAnalyticsService,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GreenerHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
