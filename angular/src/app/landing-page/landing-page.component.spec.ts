import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {LargeVideoCardComponent} from '../shared/large-video-card/large-video-card.component';
import {ArticleCardComponent} from './article-card/article-card.component';
import {LatestNewsCardComponent} from '../shared/latest-news-card/latest-news-card.component';
import {LandingPageComponent} from './landing-page.component';
import {NavigationBarComponent} from '../layout-components/navigation-bar/navigation-bar.component';
import {ResponseData} from '../shared/response-data/response-data';
import {UserJourneyType} from '../shared/response-data/user-journey-type';
import {Component, EventEmitter, Output} from '@angular/core';
import {WordpressPagesService} from '../shared/wordpress-pages-service/wordpress-pages.service';
import {StaticMeasureCardComponent} from './static-measure-card/static-measure-card.component';
import {PopupComponent} from '../shared/popup/popup.component';
import {DataCardComponent} from '../shared/data-card/data-card.component';
import {LatestNewsSectionComponent} from '../shared/latest-news-section/latest-news-section.component';
import {NavBarSuboptionComponent} from "../layout-components/navigation-bar/nav-bar-suboption/nav-bar-suboption.component";
import {InlineSVGModule} from 'ng-inline-svg';
import {SearchBarComponent} from "../layout-components/search-bar/search-bar.component";

describe('LandingPageComponent', () => {
    let component: LandingPageComponent;
    let fixture: ComponentFixture<LandingPageComponent>;
    let router: Router;
    let responseData: ResponseData;
    let mockPostcodeLookupComponent: MockPostcodeLookupComponent;

    const headingText = 'heading';
    const userJourneyType = UserJourneyType.MakeHomeGreener;
    const staticMeasures = [];
    const articles = [];
    const video = {title: '', synopsis: ''};

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
                StaticMeasureCardComponent,
                PopupComponent,
                DataCardComponent,
                NavBarSuboptionComponent,
                DataCardComponent,
                SearchBarComponent
            ],
            imports: [
                CommonModule,
                FormsModule,
                RouterTestingModule.withRoutes([]),
                InlineSVGModule
            ],
            providers: [
                ResponseData,
                {provide: WordpressPagesService, useValue: {getLatestPages: () => Observable.of([])}}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LandingPageComponent);
        component = fixture.componentInstance;
        component.staticMeasures = staticMeasures;
        component.video = video;
        component.articles = articles;
        router = TestBed.get(Router);
        responseData = TestBed.get(ResponseData);
        spyOn(router, 'navigate');
        fixture.detectChanges();
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

    it('should navigate to the questionnaire upon entering a valid postcode', () => {
        // when
        mockPostcodeLookupComponent.addressSelected.emit();

        // then
        expect(router.navigate).toHaveBeenCalledWith(['/energy-efficiency/questionnaire/home-basics']);
    });

    it('should save the user journey type upon entering a valid postcode', () => {
        // given
        component.userJourneyType = userJourneyType;

        // when
        mockPostcodeLookupComponent.addressSelected.emit();

        // then
        expect(responseData.userJourneyType).toBe(userJourneyType);
    });
});

@Component({
    selector: 'app-postcode-lookup',
    template: '<p>Mock Postcode Lookup Component</p>'
})
class MockPostcodeLookupComponent {
    @Output() public addressSelected: EventEmitter<void> = new EventEmitter<void>();
}
