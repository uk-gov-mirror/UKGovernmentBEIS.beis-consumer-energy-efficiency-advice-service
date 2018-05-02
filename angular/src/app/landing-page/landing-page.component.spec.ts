import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Component, EventEmitter, Input, Output} from '@angular/core';

import {LargeVideoCardComponent} from '../shared/large-video-card/large-video-card.component';
import {ArticleCardComponent} from './article-card/article-card.component';
import {LatestNewsCardComponent} from '../shared/latest-news-card/latest-news-card.component';
import {LandingPageComponent} from './landing-page.component';
import {NavigationBarComponent} from '../layout-components/navigation-bar/navigation-bar.component';
import {ResponseData} from '../shared/response-data/response-data';
import {UserJourneyType} from '../shared/response-data/user-journey-type';
import {WordpressPagesService} from '../shared/wordpress-pages-service/wordpress-pages.service';
import {DataCardComponent} from '../shared/data-card/data-card.component';
import {LatestNewsSectionComponent} from '../shared/latest-news-section/latest-news-section.component';
import {NavBarSuboptionComponent} from '../layout-components/navigation-bar/nav-bar-suboption/nav-bar-suboption.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {SearchBarComponent} from '../layout-components/search-bar/search-bar.component';
import {GoogleAnalyticsService} from '../shared/analytics/google-analytics.service';
import {MeasureCardComponent} from './measure-card/measure-card.component';
import {EnergySavingMeasureContentService} from '../shared/energy-saving-measure-content-service/energy-saving-measure-content.service';
import {SpinnerAndErrorContainerComponent} from '../shared/spinner-and-error-container/spinner-and-error-container.component';
import {PostcodeApiService} from '../shared/postcode-epc-service/postcode-api-service/postcode-api.service';

describe('LandingPageComponent', () => {
    let component: LandingPageComponent;
    let fixture: ComponentFixture<LandingPageComponent>;
    let router: Router;
    let responseData: ResponseData;
    let mockEpcLookupComponent: MockEpcLookupComponent;
    let mockPostcodeLookupComponent: MockPostcodeLookupComponent;

    const headingText = 'heading';
    const userJourneyType = UserJourneyType.MakeHomeGreener;
    const measures = [];
    const articles = [];
    const video = {title: '', synopsis: ''};

    const postcodeApiServiceStub = {
        fetchPostcodeDetails: (postcode) => Observable.of(null)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LandingPageComponent,
                NavigationBarComponent,
                LargeVideoCardComponent,
                ArticleCardComponent,
                LatestNewsCardComponent,
                LatestNewsSectionComponent,
                MockPostcodeLookupComponent,
                MockEpcLookupComponent,
                DataCardComponent,
                NavBarSuboptionComponent,
                DataCardComponent,
                SearchBarComponent,
                SpinnerAndErrorContainerComponent,
                SearchBarComponent,
                MeasureCardComponent
            ],
            imports: [
                CommonModule,
                FormsModule,
                RouterTestingModule.withRoutes([]),
                InlineSVGModule
            ],
            providers: [
                ResponseData,
                {provide: PostcodeApiService, useValue: postcodeApiServiceStub},
                {provide: WordpressPagesService, useValue: {getLatestPages: () => Observable.of([])}},
                {provide: EnergySavingMeasureContentService, useValue: {
                    'fetchMeasureDetailsForLandingPage': (() => Observable.of([]))
                }},
                GoogleAnalyticsService,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LandingPageComponent);
        component = fixture.componentInstance;
        component.measures = measures;
        component.video = video;
        component.articles = articles;
        router = TestBed.get(Router);
        responseData = TestBed.get(ResponseData);
        spyOn(router, 'navigate');
        fixture.detectChanges();
        mockEpcLookupComponent = fixture.debugElement.query(By.directive(MockEpcLookupComponent)).componentInstance;
        mockPostcodeLookupComponent = fixture.debugElement.query(By.directive(MockPostcodeLookupComponent)).componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct heading', () => {
        // given
        component.heading = headingText;

        // when
        fixture.detectChanges();

        // then
        const headingElement = fixture.debugElement.query(By.css('.page-heading .heading')).nativeElement;
        expect(headingElement.innerText).toEqual(headingText);
    });

    it('should navigate to the questionnaire upon entering a valid EPC', () => {
        // when
        mockEpcLookupComponent.epcSelected.emit();

        // then
        expect(router.navigate).toHaveBeenCalledWith(['/energy-efficiency/questionnaire/home-basics']);
    });

    it('should save the user journey type upon entering a valid EPC', () => {
        // given
        component.userJourneyType = userJourneyType;

        // when
        mockEpcLookupComponent.epcSelected.emit();

        // then
        expect(responseData.userJourneyType).toBe(userJourneyType);
    });
});

@Component({
    selector: 'app-epc-lookup',
    template: '<p>Mock EPC Lookup Component</p>'
})
class MockEpcLookupComponent {
    @Input() postcode: string;
    @Output() public epcSelected: EventEmitter<void> = new EventEmitter<void>();
}

@Component({
    selector: 'app-postcode-lookup',
    template: '<p>Mock Postcode Lookup Component</p>'
})
class MockPostcodeLookupComponent {
    @Output() public postcodeSelected: EventEmitter<void> = new EventEmitter<void>();
}
